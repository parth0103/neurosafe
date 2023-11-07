import axios from "axios";
class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    console.log(message)
    const lowerCaseMessage = message.toLowerCase();
    axios.post("http://localhost:5000/chatbot", {
        message: message,
      })
      .then((res) => {
        console.log(res.data.reply);
        this.actionProvider.updateMessage(res.data.reply);
      })
      .catch((err) => {
        console.log(err);
      });
    // if (lowerCaseMessage.includes("hi")) {
    //   this.actionProvider.greet();
    // }
  }
}

export default MessageParser;
