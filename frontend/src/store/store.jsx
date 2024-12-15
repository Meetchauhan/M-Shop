import { configureStore } from "@reduxjs/toolkit";
import getProducts from "../features/productSlice";
import authUser from "../features/authSlice";
import productModelSlice from "../features/productModelSlice";
import authAdmin from "../features/adminSlice";
import cartSlice from "../features/cartSlice";
import userSlice from "../features/userSlice";
import wishlistSlice from "../features/wishlistSlice";
import sidebarSlice from "../features/sidebarSlice";

export const store = configureStore({
  reducer: {
    products: getProducts,
    auth: authUser,
    handleProductModel: productModelSlice,
    admin: authAdmin,
    cart: cartSlice,
    allUser: userSlice,
    wishlist: wishlistSlice,
    sidebar : sidebarSlice
  },
});
