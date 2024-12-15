import useAdminProfile from "../../customHooks/useUserProfile/UseAdminProfile";
import AdminSidebar from "../adminSidebar/AdminSidebar";
import { useDispatch } from "react-redux";
import { openSlidebar } from "../../features/sidebarSlice";
import "./adminHeader.scss";

const AdminHeader = () => {
  const profile = useAdminProfile();
  const dispatch = useDispatch();
  return (
    <header className="adminHeader">
      <AdminSidebar />
      <nav>
        <div className="openSidebar" onClick={() => dispatch(openSlidebar())}>
          <svg
            clipRule="evenodd"
            fillRule="evenodd"
            strokeLinejoin="round"
            strokeMiterlimit="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m13 16.745c0-.414-.336-.75-.75-.75h-9.5c-.414 0-.75.336-.75.75s.336.75.75.75h9.5c.414 0 .75-.336.75-.75zm9-5c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75zm-4-5c0-.414-.336-.75-.75-.75h-14.5c-.414 0-.75.336-.75.75s.336.75.75.75h14.5c.414 0 .75-.336.75-.75z"
              fillRule="nonzero"
            />
          </svg>
        </div>
        <h5>
          Welcome Admin
          <span>
            {" "}
            {profile?.firstName} {profile?.lastName}
          </span>
        </h5>
      </nav>
    </header>
  );
};
export default AdminHeader;
