import axios from "axios";
import { useEffect, useState } from "react";
import { getSender } from "../config/ChatLogics";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import { ChatState } from "../Context/ChatProvider";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Avatar, Button, List, Typography } from "antd";
import { useSelector } from "react-redux";

const { Text } = Typography;

const MyChats = ({ fetchAgain }) => {
  const { loggedUser } = useSelector((state) => state.auth);
  const [isAddVisible, setIsAddVisible] = useState(false);
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const response = await axios.get("http://localhost:5000/api/chat/"+loggedUser._id);
      console.log(response)
      setChats(response.data);
    } catch (error) {
      /* toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      }); */
    }
  };

  useEffect(() => {
    fetchChats();
    console.log(chats)
    // eslint-disable-next-line
  }, [fetchAgain]);

  return (
    <div style={{
      direction: selectedChat ? "none" : "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: 3,
      backgroundColor: "white",
      width: "100%",
      borderRadius: "lg",
      borderWidth: "1px",
    }}
    >
      <div
        style={{
          paddingBottom: 3,
          paddingX: 3,
          fontSize: "28px",
          fontFamily: "Work sans",
          direction: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}

      >
        My Chats
        

        <Button
          style={{
            direction: "flex",
            fontSize: "17px"
          }}
          onClick={() => setIsAddVisible(c => !c)}
        >
          <PlusCircleOutlined />
          Nouveau Groupe Chat
        </Button>
        {isAddVisible && <GroupChatModal title="Groupe Chat" isAddVisible={isAddVisible} setIsAddVisible={setIsAddVisible} />}
      </div>
      <div
        style={{
          direction: "flex",
          flexDirection: "column",
          padding: 3,
          backgroundColor: "#F8F8F8",
          width: "100%",
          height: "100%",
          borderRadius: "lg",
          overflowY: "hidden"
        }}

      >
        {chats ? (
          <List
            itemLayout="horizontal"
            dataSource={chats}
            split={false}
            className="conversations-list"
            renderItem={(chat) => (
              <div
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                style={{
                  backgroundColor: selectedChat === chat ? "#38B2AC" : "#E8E8E8",
                  color: selectedChat === chat ? "white" : "black",
                  paddingX: 3,
                  paddingY: 2,
                  borderRadius: "lg",
                }}
                key={chat._id}
              >
                <List.Item actions={[<Button type="link">REPLY</Button>]}>
                  <List.Item.Meta
                    avatar={
                      <Avatar shape="square" size={48} src={chat.avatar} />
                    }
                    title={<Text>
                      {!chat.isGroupChat
                        ? getSender(loggedUser, chat.users)
                        : chat.chatName}
                    </Text>}
                    description={chat.latestMessage && (
                      <Text fontSize="xs">
                        <b>{chat.latestMessage.sender.name} : </b>
                        {chat.latestMessage.content.length > 50
                          ? chat.latestMessage.content.substring(0, 51) + "..."
                          : chat.latestMessage.content}
                      </Text>
                    )}
                  />
                </List.Item>
              </div>
            )}
          />
        ) : (
          <ChatLoading />
        )}
      </div>
    </div>
  );
};

export default MyChats;
