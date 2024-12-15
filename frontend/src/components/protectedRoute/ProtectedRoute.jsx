import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectRoute = ({ children, allowedRoles }) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");
  const adminInfo = JSON.parse(localStorage.getItem("adminInfo") || "null");
  const { pathname } = useLocation();

  // Determine the current role
  const currentRole = userInfo ? "user" : adminInfo ? "admin" : null;

  // Define routes allowed for each role
  const allowedRoutesForRoles = {
    user: ["/", "/profile", "/cart", "/wishlist"],
    admin: ["/dashboard", "/users"],
  };

  // Redirect if no role or role mismatch
  if (!currentRole || !allowedRoles.includes(currentRole)) {
    return <Navigate to="/login" replace />;
  }

  // Redirect to the default route if accessing unauthorized paths
  const allowedRoutes = allowedRoutesForRoles[currentRole];
  if (!allowedRoutes.includes(pathname)) {
    const defaultRoute = currentRole === "admin" ? "/dashboard" : "/";
    return <Navigate to={defaultRoute} replace />;
  }

  // Render the children if authorized
  return children;
};

ProtectRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProtectRoute;
