import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
  const products = await Product.find({});
  try {
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("Error", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createProduct = async (req, res) => {
  const { name, price, quantity, category } = req.body;
  const file = req.file;

  if (!name || !price || !file || !quantity || !category) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const imageUrl = `${req.protocol}://${req.headers.host}/uploads/${file.filename}`;
  const newProduct = new Product({
    name,
    price,
    quantity,
    category,
    image: imageUrl,
  });

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error in create product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, quantity, category } = req.body;
  const file = req.file;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product Id" });
  }

  try {
    const existingProduct = await Product.findById(id);

    if (!existingProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product Not Found" });
    }

    const imageUrl = file
      ? `${req.protocol}://${req.headers.host}/uploads/${file.filename}`
      : existingProduct.image;

    const updatedFields = {
      name: name || existingProduct.name,
      price: price || existingProduct.price,
      quantity: quantity || existingProduct.quantity,
      category: category || existingProduct.category,
      image: imageUrl,
    };

    const updatedProduct = await Product.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product Id" });
  }
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product Deleted" });
  } catch (error) {
    console.error("Error", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
