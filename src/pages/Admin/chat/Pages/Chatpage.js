import { useEffect, useState } from "react";
import Chatbox from "../components/Chatbox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider";
import { useSelector, useDispatch} from "react-redux";
import { getAllUsers, getAllUsersByRole } from "../../../../redux/reducers/users";

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { role, entrepriseImport } = useSelector((state) => state.auth.loggedUser);
  const dispatch = useDispatch();
  const { user } = ChatState();

  useEffect(() => {
    if (role === "ADMIN") {
      dispatch(getAllUsers())
    } else {
      dispatch(getAllUsersByRole(entrepriseImport?._id))
    }
  }, []);
  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <div style={{ direction : "flex", justifyContent: "space-between", width: "100%", height: "91.5vh", padding: "10px"}} >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </div>
    </div>
  );
};

export default Chatpage;
