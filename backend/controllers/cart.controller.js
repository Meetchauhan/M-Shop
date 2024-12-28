import mongoose from "mongoose";
import User from "../models/user.model.js";
import Product from "../models/product.model.js";

export const addToCart = async (req, res) => {
  const { productId, name, price, image, quantity, totalQuantity } = req.body;

  const user = await User.findById(req.user?._id);

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

    const existingProduct = user.cart.find(
      (item) => item.productId.toString() === productId
    );

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      user.cart.push({ productId, name, price, image, quantity, totalQuantity  });
    }

    await user.save();

    res.status(200).json({ success: true, data: user.cart });
  } catch (error) {
    console.error("Error adding to cart:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const decreaseProductFromCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const user = await User.findById(req.user?._id);
  const isProductInCart = user?.cart?.find(
    (item) => item.productId.toString() === productId
  );
  try {
    if (isProductInCart) {
      isProductInCart.quantity = isProductInCart.quantity - 1;
    }
    await user.save();
    res.status(200).json({ status: true, quantity: isProductInCart.quantity });
  } catch (error) {
    res.status(500).json({ status: false, message: "Server error" });
  }
};

export const increaseProductFromCart = async (req, res) => {
  const { productId } = req.body;
  const user = await User.findById(req.user?._id);
  const isProductInCart = user?.cart?.find(
    (item) => item.productId.toString() === productId
  );
  try {
    if (isProductInCart) {
      isProductInCart.quantity = isProductInCart.quantity + 1;
    }
    await user.save();
    res.status(200).json({ status: true, quantity: isProductInCart.quantity });
  } catch (error) {
    res.status(500).json({ status: false, message: "Server error" });
  }
};

export const removeFromCart = async (req, res) => {
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

    user.cart = user.cart.filter(
      (item) => item.productId.toString() !== productId
    );

    await user.save();

    return res.status(200).json({
      status: true,
      message: "Product removed from cart",
      data: user.cart,
    });
  } catch (error) {
    console.error("Error on remove product from cart:", error);
    return res.status(500).json({ status: false, message: "Server error" });
  }
};

export const getCartProducts = async (req, res) => {
  const user = await User.findById(req.user?._id);
  try {
    if (user && user?.cart?.length > 0) {
      res.status(200).json({ success: true, data: user.cart });
    } else {
      res
        .status(200)
        .json({ success: true, message: "Empty cart", data: user.cart });
    }
  } catch (error) {
    console.error("Error in cart products");
    res.status(500).json({ status: true, message: "Server error" });
  }
};
