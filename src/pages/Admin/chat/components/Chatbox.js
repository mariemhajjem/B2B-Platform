import "./styles.css";
import SingleChat from "./SingleChat";
import { ChatState } from "../Context/ChatProvider";

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <div
      style={{
        direction: selectedChat ? "flex" : "none",
        alignItems: "center",
        flexDirection: "column",
        padding: 3,
        backgroundColor: "white",
        width: "100%",
        borderRadius: "lg",
        borderWidth: "1px",
      }}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </div>
  );
};

export default Chatbox;
