import mongoose from "mongoose";
import User from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "Please provide all fields" });
  }

  const userExist = await User.findOne({ email });
  if (userExist) {
    return res.status(400).json({ message: "User already exists" });
  }

  try {
    const newUser = new User({ firstName, lastName, email, password });
    await newUser.save();

    generateToken(res, newUser._id);

    const logFilePath = path.join(__dirname, "../logs/userRegister.txt");
    const logData = `New User Registered:
    Name: ${firstName} ${lastName}
    Email: ${email}
    Date: ${new Date().toISOString()}
    -----------------------------\n`;

    fs.appendFile(logFilePath, JSON.stringify(newUser), (err) => {
      if (err) {
        console.error("Failed to write to log file:", err);
      } else {
        console.log("User registration logged successfully.");
      }
    });

    res.status(201).json({ status: true, data: newUser });
  } catch (error) {
    console.error("Error during user creation:", error);
    res.status(500).json({ status: false, message: "Server error" });
  }
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  try {
    if (user?.email === email && user?.password === password) {
      generateToken(res, user._id);
      res.status(201).json({
        status: true,
        message: "User login Successfully",
        data: {
          _id: user._id,
          email: user.email,
          password: user.password,
          role: "user",
        },
      });
    } else {
      res
        .status(401)
        .json({ status: false, message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: "Server Error" });
  }
};

export const userLogout = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  try {
    res.status(200).json({ status: true, message: "User logout Successfully" });
  } catch (error) {
    res.status(500).json({ status: false, message: "Server Error" });
  }
};

export const getUserProfile = async (req, res) => {
  const user = {
    _id: req?.user?._id,
    firstName: req?.user?.firstName,
    lastName: req?.user?.lastName,
    email: req?.user?.email,
    password: req?.user?.password,
  };

  res.status(200).json({ status: true, data: user });
};

export const updateUser = async (req, res) => {
  const user = await User.findById(req.user?._id);

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;

    const updateUser = await user.save();
    res.status(200).json({
      status: true,
      data: {
        _id: updateUser._id,
        firstName: updateUser.firstName,
        lastName: updateUser.lastName,
        email: updateUser.email,
        password: updateUser.password,
      },
    });
  } else {
    res.status(401).json({ status: false, message: "User not found" });
  }
};

export const getUsers = async (req, res) => {
  const user = await User.find({});
  try {
    if (user) {
      res.status(200).json({ status: true, data: user });
    } else {
      res.status(400).json({ status: true, message: "No user found" });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: "Server error" });
  }
};

export const updateUserByAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, password } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.password = password || user.password;

    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product Id" });
  }
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "User Deleted" });
  } catch (error) {
    console.error("Error", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
