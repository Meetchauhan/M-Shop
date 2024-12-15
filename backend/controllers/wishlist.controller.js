import mongoose from "mongoose";
import User from "../models/user.model.js";
import Product from "../models/product.model.js";

export const addToWishlist = async (req, res) => {
  const { productId, name, price, image, quantity } = req.body;

  const user = await User.findById(req.user?._id);

  console.log("product id", productId);

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid Product Id" });
  }

  if (!user) {
    return res
      .status(400)
      .json({ success: false, message: "User ID is required" });
  }
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    user.wishlist.push({ productId, name, price, image, quantity });

    await user.save();

    res.status(200).json({ success: true, data: user.wishlist });
  } catch (error) {
    console.error("Error adding to cart:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const removeFromWishlist = async (req, res) => {
  const { productId } = req.body;

  if (!productId) {
    return res
      .status(400)
      .json({ status: false, message: "Product ID is required" });
  }

  try {
    const user = await User.findById(req.user?._id);
    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    user.wishlist = user.wishlist.filter(
      (item) => item.productId.toString() !== productId
    );

    await user.save();

    return res.status(200).json({
      status: true,
      message: "Product removed from wishlist",
      data: user.wishlist,
    });
  } catch (error) {
    console.error("Error on remove product from cart:", error);
    return res.status(500).json({ status: false, message: "Server error" });
  }
};

export const getWishlistProducts = async (req, res) => {
  const user = await User.findById(req.user?._id);
  try {
    if (user && user?.wishlist?.length > 0) {
      res.status(200).json({ success: true, data: user.wishlist });
    }
  } catch (error) {
    console.error("Error in cart products");
    res.status(500).json({ status: true, message: "Server error" });
  }
};
