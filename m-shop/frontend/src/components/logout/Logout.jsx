import { useDispatch } from "react-redux";
import { logoutUser } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";
import "./logout.scss";
// import { emptyCart } from "../../features/cartSlice";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUser()).unwrap();
    // await dispatch(emptyCart()).unwrap();

    navigate("/login", { replace: true });
  };
  return (
    <div className="logout">
      <div className="btn" onClick={handleLogout}>Logout</div>
    </div>
  );
};
export default Logout;
