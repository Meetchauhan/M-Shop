import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";
import AdminHeader from "../adminHeader/AdminHeader";
import { Fragment } from "react";
import AdminFooter from "../adminFooter/AdminFooter";
// import Header from "../header/Header";
// import Footer from "../footer/Footer";

const AdminLayout = () => {
  return (
    <>
      <AdminHeader />
      <main>
        <Outlet />
      </main>
      <AdminFooter />
    </>
  );
};
export default AdminLayout;

AdminLayout.propTypes = {
  children: PropTypes.any,
};
