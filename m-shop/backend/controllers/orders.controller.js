import Orders from "../models/orders.model.js";
import User from "../models/user.model.js";

export const orders = async (req, res) => {
  const {
    paymentId,
    orderId,
    signature,
    totalAmount,
    address,
    phone,
    city,
    state,
    pincode,
  } = req.body;

  try {
    const user = await User.findById(req.user?._id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }
    if (!user.cart || user.cart.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty, cannot place an order!",
      });
    }
    const totalOrderCount = await Orders.countDocuments();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const formattedDate = new Date().toLocaleDateString("en-US", options);

    const newOrder = new Orders({
      cart: user.cart,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      paymentId: paymentId,
      totalAmount: totalAmount / 100,
      address: address,
      phone: phone,
      city: city,
      state: state,
      pincode: pincode,
      orderId: orderId,
      orderNumber: totalOrderCount + 1,
      userId: user._id,
      signature: signature,
      orderDate: new Date(),
      formatedDate: formattedDate,
      status: "pending",
    });

    const savedOrder = await newOrder.save();

    user.cart = [];

    await user.save();

    res.status(200).json({
      success: true,
      message: "Order placed successfully!",
      order: savedOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      success: false,
      message: "Server error, could not create order.",
    });
  }
};

export const allOrders = async (req, res) => {
  const user = await User.findById(req.user?._id);
  const orders = await Orders.find({ userId: user._id })
    .sort({ orderDate: -1 })
    .exec();

  try {
    if (user) {
      res.status(200).json({ success: true, data: orders });
    } else {
      res
        .status(400)
        .json({ success: false, message: "No Authorise, No Token" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const allOrdersAdmin = async (req, res) => {
  const orders = await Orders.find({}).sort({ orderDate: -1 }).exec();
  try {
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const changeStatus = async (req, res) => {
  const { orderId, status } = req.body;
  try {
    const order = await Orders.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }
    order.status = status;
    await order.save();
    res.status(200).json({
      success: true,
      message: "Order status updated successfully!",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
