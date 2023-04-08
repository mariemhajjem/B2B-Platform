import { BellOutlined, DownOutlined } from '@ant-design/icons';
import { Badge, Button, Drawer, Input, Menu, Spin, Typography } from 'antd';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ChatLoading from "../ChatLoading";
import UserListItem from "../userAvatar/UserListItem";
import { getSender } from "../../config/ChatLogics";
import { ChatState } from "../../Context/ChatProvider";
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
const {Text, Title } = Typography;

function SideDrawer() {
  const { list } = useSelector((state) => state.users);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setSearchResult(list);
  }, [])
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();

  const navigate = useNavigate()
  const [current, setCurrent] = useState('mail');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  const logoutHandler = () => {
    navigate("/");
  };

  const handleSearch = async () => {
    if (!search) {
      alert( "Please Enter something in search")
      return;
    }

    try {
      setLoading(true);

      let data = list.filter((item) => {
        return item.firstName === search || item.lastName === search;
      });
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      console.log(error);
    }
  };

  const accessChat = async (userId) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      console.log("Error fetching the chat");
    }
  };

  const items = [
    {
      label: '',
      key: 'search',
      icon: <Button onClick={showDrawer}>
      <i className="fas fa-search"></i>
      <Text d={{ base: "none", md: "flex" }} px={4}>
        Search User
      </Text>
    </Button>,
    },
    {
      label: '',
      key: 'SubMenu',
      icon: <Badge size="small" count={notification.length}>
      <BellOutlined />
    </Badge>,
      children: notification.length ? notification.map((notif) =>
      ({
        type: 'group',
        label: 'Item 1',
        children: [
          {
            label: <Typography.Link
              onClick={() => {
                setSelectedChat(notif.chat);
                setNotification(notification.filter((n) => n !== notif));
              }}
              style={{
                marginRight: 8,
              }}
            >{notif.chat.isGroupChat
              ? `New Message in ${notif.chat.chatName}`
              : `New Message from ${getSender(user, notif.chat.users)}`}
            </Typography.Link>,
            key: notif._id,

          },
        ],
      })) : [
        {
          type: 'group',
          label: "No New Messages",
        }],
    },
    {
      label: '',
      key: 'mail',
      icon: <DownOutlined />,
    },
  ];

  return (
    <>
      <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
      <Drawer
        title="Recherche"
        placement="left"
        closable={false}
        onClose={onClose}
        open={open}
        key="left"
      >
        <Title>Search Users</Title>
          <div>
            <div style={{direction: "flex", paddingBottom: 2}}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </div>
            {
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            }
            {loadingChat && <Spin ml="auto" d="flex" />}
          </div>
      </Drawer>
    </>
  );
}

export default SideDrawer;
