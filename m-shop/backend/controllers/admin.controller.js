import Admin from "../models/admin.model.js";
import {generateAdminToken} from "../utils/generateToken.js";

export const createAdmin = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const admin = new Admin({ firstName, lastName, email, password });
  const adminExist = await Admin.findOne({ email });
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "Please provide all fields" });
  }
  if (adminExist) {
    return res.status(400).json({ message: "Admin already exist" });
  }
  try {
    generateAdminToken(res, admin._id);
    await admin.save();
    res.status(200).json({ status: true, message: newAdmin });
  } catch (error) {
    res.status(500).json({ status: false, message: "Server error" });
  }
};

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  try {
    if (admin?.email === email && admin?.password === password) {
      generateAdminToken(res, admin._id);
      res.status(200).json({
        status: true,
        message: "Admin logged in successfully...!",
        data: {
          _id: admin?._id,
          email: admin?.email,
          password: admin?.password,
          role:"admin"
        },
      });
    } else {
      res
        .status(401)
        .json({ status: false, message: "Invalid Email or Password...!" });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: "Server Error" });
  }
};

export const logoutAdmin = async (req, res) => {
  res.cookie("jwtAdmin", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  try {
    res.status(200).json({ status: true, message: "Admin logout Successfully...!" });
  } catch (error) {
    res.status(500).json({ status: false, message: "Server Error" });
  }
};

export const getAdminProfile = async (req, res) => {
  const admin = {
    _id: req?.admin?._id,
    firstName: req?.admin?.firstName,
    lastName: req?.admin?.lastName,
    email: req?.admin?.email,
    password: req?.admin?.password,
  };

  res.status(200).json({ status: true, data: admin });
};