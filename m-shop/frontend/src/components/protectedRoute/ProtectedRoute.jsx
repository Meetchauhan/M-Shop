import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectRoute = ({ children, allowedRoles }) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");
  const adminInfo = JSON.parse(localStorage.getItem("adminInfo") || "null");
  const { pathname } = useLocation();

  const currentRole = userInfo ? "user" : adminInfo ? "admin" : null;

  const allowedRoutesForRoles = {
    user: [
      "/",
      "/profile",
      "/cart",
      "/wishlist",
      "/checkout",
      "/thank-you",
      "/order-history",
      "/product/:productId",
    ],
    admin: ["/dashboard", "/users", "/orders"],
  };

  const isRouteAllowed = (routeList, path) => {
    return routeList.some((route) => {
      const routePattern = new RegExp(`^${route.replace(/:\w+/g, "[^/]+")}$`);
      return routePattern.test(path);
    });
  };

  if (!currentRole || !allowedRoles.includes(currentRole)) {
    return <Navigate to="/login" replace />;
  }

  const allowedRoutes = allowedRoutesForRoles[currentRole];
  if (!isRouteAllowed(allowedRoutes, pathname)) {
    const defaultRoute = currentRole === "admin" ? "/dashboard" : "/";
    return <Navigate to={defaultRoute} replace />;
  }

  // Render children if authorized
  return children;
};

ProtectRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProtectRoute;
