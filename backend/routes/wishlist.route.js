import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addToWishlist,
  getWishlistProducts,
  removeFromWishlist,
} from "../controllers/wishlist.controller.js";

const router = express.Router();

router.route("/addToWishlist").post(protect, addToWishlist);
router.route("/wishlistProducts").get(protect, getWishlistProducts);
router.route("/removeWishlist").post(protect, removeFromWishlist);
export default router;
