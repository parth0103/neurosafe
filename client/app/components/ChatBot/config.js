import { createChatBotMessage } from 'react-chatbot-kit';

const config = { 
  botName: "NeuroBot",
  initialMessages: [createChatBotMessage("Hi, I'm NeuroBot. How can I help you todayx")],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#ff7a00",
    },
    chatButton: {
      backgroundColor: "#ff7a00",
    },
  },
}

export default config