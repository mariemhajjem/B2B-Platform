import "./index.css";
import App from "./App";
import ChatProvider from "./Context/ChatProvider";

function Chat() {
  return (
      <ChatProvider>
        <App />
      </ChatProvider>
  )
}

export default Chat;
