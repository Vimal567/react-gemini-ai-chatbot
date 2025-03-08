import "./Chatbot.css"
import ChatForm from "./Components/ChatForm";
import { useEffect, useRef, useState } from "react";
import ChatMessage from "./Components/ChatMessage";
import xMark from './assets/xMark.svg';
import messageIcon from './assets/messageIcon.svg';
import angleDown from './assets/angleDown.svg';
import chatbotIcon from './assets/chatbotIcon.svg';
import chatbotIconViolet from './assets/chatbotIcon-violet.svg';

const App = ({ apiKey }) => {

  const [chatHistory, setChatHistory] = useState([]);
  const [showChatbot, setShowChatbot] = useState(false);
  const chatBodyRef = useRef();

  const generateBotResponse = async (history) => {
    const updateChats = (resText, isError = false) => {
      setChatHistory(chats => [...chats.filter(msg => msg.text !== "Thinking..."), { role: "model", text: resText, isError }])
    }

    //Parse the payload for api
    history = history.map(({ role, text }) => [{ role, parts: [{ text }] }]);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: history })
    };

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, requestOptions);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error.message || "Something went wrong");
      const geminiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
      updateChats(geminiResponseText);
    } catch (error) {
      updateChats(error.message, true);
    }
  }

  useEffect(() => {
    //Show latest messages by scrolling down
    chatBodyRef.current.scrollTo({ top: chatBodyRef.current.scrollHeight, behaviour: "smooth" });
  }, [chatHistory])


  return (
    <div className={`container ${showChatbot && 'show-chatbot'}`}>
      <button id="chatbot-toggler" onClick={() => setShowChatbot(toggle => !toggle)} title="Toggle">
        {!showChatbot && <img src={messageIcon} alt="open chat" width={30} height={30} />}
        {showChatbot && <img src={xMark} alt="close chat" width={30} height={30} />}
      </button>

      <div className="chatbot-popup">
        {/* Chatbot Header */}
        <div className="chat-header">
          <div className="header-info">
            <img src={chatbotIconViolet} alt="close chat" width={50} height={50} />
            <h2 className="logo-text">Chatbot</h2>
          </div>
          <button onClick={() => setShowChatbot(toggle => !toggle)} title="Close">
            <img src={angleDown} alt="close chat" width={45} height={45} />
          </button>
        </div>

        {/* Chatbot body */}
        <div ref={chatBodyRef} className="chat-body">
          <div className="message bot-message">
            <img src={chatbotIcon} alt="close chat" width={30} height={30} />
            <p className="message-text">
              Hey there <br /> How can I help you today?
            </p>
          </div>

          {/* Render the chat messages */}
          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
        </div>

        {/* Chatbot footer */}
        <div className="chat-footer">
          <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotResponse={generateBotResponse} />
        </div>
      </div>
    </div>
  )
}

export default App;
