import { EyeOutlined } from "@ant-design/icons";
import { Form, Button, Spin, Input, Modal } from "antd";
import axios from "axios";
import { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import UserBadgeItem from "../userAvatar/UserBadgeItem";
import UserListItem from "../userAvatar/UserListItem";

const UpdateGroupChatModal = ({ fetchMessages, fetchAgain, setFetchAgain }) => {
  const [isAddVisible, setIsAddVisible] = useState(false);
  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameloading, setRenameLoading] = useState(false);

  const { selectedChat, setSelectedChat, user } = ChatState();

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      console.log(data);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      /* toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      }); */
      setLoading(false);
    }
  };

  const handleRename = async () => {
    if (!groupChatName) return;

    try {
      setRenameLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/chat/rename`,
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );

      console.log(data._id);
      // setSelectedChat("");
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
    } catch (error) {
      /* toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      }); */
      setRenameLoading(false);
    }
    setGroupChatName("");
  };

  const handleAddUser = async (user1) => {
    if (selectedChat.users.find((u) => u._id === user1._id)) {
      /* toast({
        title: "User Already in group!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      }); */
      alert("User Already in group!")
      return;
    }

    if (selectedChat.groupAdmin._id !== user._id) {
      /* toast({
        title: "Only admins can add someone!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      }); */
      alert("Only admins can add someone!")
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/chat/groupadd`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      /* toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      }); */
      alert("Error Occured!")
      setLoading(false);
    }
    setGroupChatName("");
  };

  const handleRemove = async (user1) => {
    if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
      /* toast({
        title: "Only admins can remove someone!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      }); */
      alert("Only admins can remove someone!")
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/chat/groupremove`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );

      user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      fetchMessages();
      setLoading(false);
    } catch (error) {
      /* toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      }); */
      alert(error.response.data.message)
      setLoading(false);
    }
    setGroupChatName("");
  };

  return (
    <>
      <Button
        style={{
          direction: "flex"
        }}
        onClick={() => setIsAddVisible(c => !c)}
      >
        <EyeOutlined />
      </Button>
      <Modal
        title={selectedChat.chatName}
        footer={[<Button onClick={() => handleRemove(user)} colorScheme="red">
          Leave Group
        </Button>]}
        open={isAddVisible}
        onCancel={() => setIsAddVisible(c => !c)}
      >
        <div style={{
          width: "100%",
          direction: "flex",
          flexWrap: "wrap",
          paddingBottom: 3,
        }} >
          {selectedChat.users.map((u) => (
            <UserBadgeItem
              key={u._id}
              user={u}
              admin={selectedChat.groupAdmin}
              handleFunction={() => handleRemove(u)}
            />
          ))}
        </div>

        <Form
          name="chat"
          scrollToFirstError
        >
          <Form.Item
            name="chat_name"
            label="nom chat"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              placeholder="Nom du chat"
              style={{marginBottom: 3}}
              value={groupChatName}
              onChange={(e) => setGroupChatName(e.target.value)}
            />
            <Button
              variant="solid"
              colorScheme="teal"
              ml={1}
              isLoading={renameloading}
              onClick={handleRename}
            >
              Update
            </Button>
          </Form.Item>

          <Form.Item
            name="add_user"
            label="Add User to group"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              style={{
                marginBottom: 1
              }}
              placeholder="Add User to group"
              onChange={(e) => handleSearch(e.target.value)} />
          </Form.Item>

          {loading ? (
            <Spin size="large" />
          ) : (
            searchResult?.map((user) => (
              <UserListItem
                key={user._id}
                user={user}
                handleFunction={() => handleAddUser(user)}
              />
            ))
          )}
          <Form.Item>
            <Button type="primary" htmlType="submit" shape="round"> Valider </Button>
          </Form.Item>

        </Form>
      </Modal>
    </>
  );
};

export default UpdateGroupChatModal;
