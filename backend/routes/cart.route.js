import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import {
  addToCart,
  decreaseProductFromCart,
  getCartProducts,
  increaseProductFromCart,
  removeFromCart,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.route("/addToCart").post(protect, addToCart);
router.route("/cart-products").get(protect, getCartProducts);
router.route("/decreaseProduct").post(protect, decreaseProductFromCart);
router.route("/increaseProduct").post(protect, increaseProductFromCart);
router.route("/removeCart").post(protect, removeFromCart);
export default router;
