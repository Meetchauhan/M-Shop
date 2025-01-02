import mongoose from "mongoose";

const ordersSchema = new mongoose.Schema(
  {
    cart: [
      {
        productName: String,
        price: Number,
        image: String,
        quantity: Number,
        category: String,
        name: String,
      },
    ],
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
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },

    pincode: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    paymentId: {
      type: String,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    orderId: {
      type: String,
      required: true,
    },
    orderNumber: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    signature: {
      type: String,
      required: true,
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
    formatedDate: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Orders = mongoose.model("Orders", ordersSchema);

export default Orders;
