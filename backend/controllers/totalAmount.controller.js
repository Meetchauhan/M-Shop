import User from "../models/user.model.js";

export const getTotalAmount = async (req, res) => {
  const user = await User.findById(req.user?._id);
  try {
    const total = user?.cart.map((item) => item.price * item.quantity);
    const totalAmount = total
      .reduce((prev, price) => prev + price, 0)
      .toLocaleString("en-IN");
    res.status(200).json({ status: true, totalAmount: totalAmount });
  } catch (error) {
    res.status(500).json({ status: false, error: "Server error" });
  }
};
