import { CloseOutlined } from "@ant-design/icons";
import { Tag } from "antd";

const UserBadgeItem = ({ user, handleFunction, admin }) => {
  return (
    <Tag
      px={2}
      py={1}
      borderRadius="lg"
      m={1}
      mb={2}
      variant="solid"
      fontSize={12}
      colorScheme="purple"
      cursor="pointer"
      onClick={handleFunction}
    >
      {user.name}
      {admin === user._id && <span> (Admin)</span>}
      <CloseOutlined />
    </Tag>
  );
};

export default UserBadgeItem;
