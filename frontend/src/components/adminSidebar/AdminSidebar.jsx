import { useDispatch, useSelector } from "react-redux";
import "./adminSidebar.scss";
import { closeSidebar } from "../../features/sidebarSlice";
import LogoutAdmin from "../logout/LogoutAdmin";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  const dispatch = useDispatch();
  const handleSidebar = useSelector((state) => state?.sidebar?.value);
  console.log("sidebar", handleSidebar);

  return (
    <div className={`sidebar ${handleSidebar ? "show" : "hide"}`}>
      <nav>
        <div className="closeBtn" onClick={() => dispatch(closeSidebar())}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M24 3.752l-4.423-3.752-7.771 9.039-7.647-9.008-4.159 4.278c2.285 2.885 5.284 5.903 8.362 8.708l-8.165 9.447 1.343 1.487c1.978-1.335 5.981-4.373 10.205-7.958 4.304 3.67 8.306 6.663 10.229 8.006l1.449-1.278-8.254-9.724c3.287-2.973 6.584-6.354 8.831-9.245z" />
          </svg>
        </div>
        <ul>
          <li>
            <Link to="/dashboard" onClick={() => dispatch(closeSidebar())}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/users" onClick={() => dispatch(closeSidebar())}>
              Users
            </Link>
          </li>
          <li>
            <LogoutAdmin />
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default AdminSidebar;
