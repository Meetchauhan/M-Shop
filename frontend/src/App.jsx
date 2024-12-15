import { Routes, Route } from "react-router-dom";
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

function App() {
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
      </Route>
    </Routes>
  );
}

export default App;
