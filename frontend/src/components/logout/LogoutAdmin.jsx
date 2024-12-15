import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAdmin } from "../../features/adminSlice";
import "./logout.scss";
import { closeSidebar } from "../../features/sidebarSlice";

const LogoutAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    dispatch(closeSidebar());
    await dispatch(logoutAdmin()).unwrap();
    navigate("/admin", { replace: true });
  };
  return (
    <div className="admin_logout">
      <div className="btn" onClick={() => handleLogout()}>Logout</div>
    </div>
  );
};
export default LogoutAdmin;
