
import { Avatar, Typography } from "antd";
import { ChatState } from "../../Context/ChatProvider";
const { Text } = Typography;
const UserListItem = ({ handleFunction }) => {
  const { user } = ChatState();

  return (
    <div
      onClick={handleFunction}
      cursor="pointer"
      style={{
        backgroundColor: "#E8E8E8",
        width: "100%",
        direction: "flex",
        alignItems: "center",
        color: "black",
        paddingX: 3,
        paddingY: 2,
        mb: 2,
        borderRadius: "lg",
      }}

    >
      <Avatar
        mr={2}
        size="small"
        cursor="pointer"
        name={user.firstName}
        src={user.pic}
      />
      <div>
        <Text>{user.firstName}</Text>
        <Text fontSize="xs">
          <b>Email : </b>
          {user.email}
        </Text>
      </div>
    </div>
  );
};

export default UserListItem;
