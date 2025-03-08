# React Gemini AI Chatbot

This project provides a React component for integrating a chatbot powered by Gemini AI.

## Installation

To install the package, run:

### `npm i react-gemini-ai-bot`

## Setup

In your React app, import and use the `Chatbot` component:

```jsx
import React from "react";
import { Chatbot } from "react-gemini-ai-bot/dist/index";

export default function App() {
  const apiKey = "YOUR_API_KEY"; // Replace with your actual API key

  return (
    <div>
      <h1>Import chatbot</h1>
      <Chatbot apiKey={apiKey} />
    </div>
  );
}
```

## API Key Setup

To use the chatbot, you need an API key from Gemini AI. You can obtain a free API key from:

[Gemini AI Studio](https://aistudio.google.com/apikey)

Replace `YOUR_API_KEY` in the example above with your actual key.

## Version Compatibility

Ensure that your project meets the required compatibility:

- React: `>=18.0.0`
- Node.js: `>=14.0.0`

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.