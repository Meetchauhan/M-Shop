import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/home/Home";
import Admin from "./pages/dashboard/Dashboard";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import ProtectRoute from "./components/protectedRoute/ProtectedRoute";
import Layout from "./components/layout/Layout";
import Profile from "./pages/profile/Profile";
import RegisterAdmin from "./pages/register/RegisterAdmin";
import LoginAdmin from "./pages/login/LoginAdmin";
import Cart from "./pages/cart/Cart";
import WishList from "./pages/wishList/WishList";
import Users from "./pages/users/Users";
import AdminLayout from "./components/layout/AdminLayout";
import Checkout from "./pages/checkout/Checkout";
import Thankyou from "./pages/thankyou/Thankyou";
import { useEffect } from "react";
import ProductDetail from "./pages/productDetail/ProductDetail";
import OrderHistory from "./pages/orderHistory/OrderHistory";
import OrdersPage from "./pages/ordersPage/OrdersPage";

function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (
      userInfo &&
      userInfo.expirationTime &&
      Date.now() > userInfo.expirationTime
    ) {
      localStorage.removeItem("userInfo");
      localStorage.removeItem("cart");
      console.log("User info has expired and is removed from localStorage.");
    }
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin-register" element={<RegisterAdmin />} />
      <Route path="/admin" element={<LoginAdmin />} />

      {/* User Layout and Protected Routes */}
      <Route
        element={
          <ProtectRoute allowedRoles={["user"]}>
            <Layout />
          </ProtectRoute>
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/thank-you" element={<Thankyou />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/product/:name" element={<ProductDetail />} />
      </Route>

      {/* Admin Layout and Protected Routes */}
      <Route
        element={
          <ProtectRoute allowedRoles={["admin"]}>
            <AdminLayout />
          </ProtectRoute>
        }
      >
        <Route path="/dashboard" element={<Admin />} />
        <Route path="/users" element={<Users />} />
        <Route path="/orders" element={<OrdersPage />} />
      </Route>
    </Routes>
  );
}

export default App;
