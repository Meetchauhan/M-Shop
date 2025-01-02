import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  totalQuantity: {
    type: Number,
  },
});

const wishlistItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
});
// const orderItemSchema = new mongoose.Schema({
//   cartItems: [cartItemSchema],
//   totalAmount: {
//     type: Number,
//     required: true,
//   },
//   orderDate: {
//     type: Date,
//     default: Date.now,
//   },
//   status: {
//     type: String,
//     enum: ['pending', 'completed', 'shipped', 'cancelled'],
//     default: 'pending',
//   },
// });

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    cart: [cartItemSchema],
    wishlist: [wishlistItemSchema],
    // orders: [orderItemSchema],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
