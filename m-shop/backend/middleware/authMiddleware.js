import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Admin from "../models/admin.model.js";

const protect = async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId);
    } catch (error) {
      return res
        .status(401)
        .json({ status: false, message: "No authorized, invalid token" });
    }
  } else {
    return res
      .status(401)
      .json({ status: false, message: "No authorized, no token" });
  }
  next();
};

const protectAdmin = async (req, res, next) => {
  let token;

  token = req.cookies.jwtAdmin;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.admin = await Admin.findById(decoded.adminId);
    } catch (error) {
      return res
        .status(401)
        .json({ status: false, message: "No authorized, invalid token" });
    }
  } else {
    return res
      .status(401)
      .json({ status: false, message: "No authorized, no token" });
  }
  next();
};
export { protect, protectAdmin };
