import { Button, Form, Input, Modal } from "antd";
import axios from "axios";
import { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import UserBadgeItem from "../userAvatar/UserBadgeItem";
import UserListItem from "../userAvatar/UserListItem";

const GroupChatModal = ({ children, setIsAddVisible, isAddVisible }) => {

  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  // const toast = useToast();

  const { user, chats, setChats } = ChatState();
  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      /* toast({
        title: "User already added",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      }); */
      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  };

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
    }
  };

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      /* toast({
        title: "Please fill all the feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      }); */
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `/api/chat/group`,
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );
      setChats([data, ...chats]);
      setIsAddVisible(c => !c)
      /* toast({
        title: "New Group Chat Created!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      }); */
    } catch (error) {
      /* toast({
        title: "Failed to Create the Chat!",
        description: error.response.data,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      }); */
    }
  };

  return (
    <Modal
      title="Create Group Chat"
      open={isAddVisible}
      onCancel={() => setIsAddVisible(c => !c)}
      footer={[
        <Button onClick={handleSubmit} colorScheme="blue">
          Create Chat
        </Button>]}>

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
            style={{ marginBottom: 3 }}
            value={groupChatName}
            onChange={(e) => setGroupChatName(e.target.value)}
          />
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
            placeholder="Add Users eg: John, Piyush, Jane"
            onChange={(e) => handleSearch(e.target.value)} />
        </Form.Item>
        <div style={{ width: "100%", direction: "flex", flexWrap: "wrap" }} >
          {selectedUsers.map((u) => (
            <UserBadgeItem
              key={u._id}
              user={u}
              handleFunction={() => handleDelete(u)}
            />
          ))}
        </div>
        {loading ? (
          // <ChatLoading />
          <div>Loading...</div>
        ) : (
          searchResult
            ?.slice(0, 4)
            .map((user) => (
              <UserListItem
                key={user._id}
                user={user}
                handleFunction={() => handleGroup(user)}
              />
            ))
        )}

      </Form>
    </Modal>
  );
};

export default GroupChatModal;
