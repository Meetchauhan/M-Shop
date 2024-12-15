import express from "express";
import {
  createUser,
  deleteUser,
  getUserProfile,
  getUsers,
  updateUser,
  updateUserByAdmin,
  userLogin,
  userLogout,
} from "../controllers/user.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", userLogin);
router.post("/logout", userLogout);
router.route("/profile").get(protect, getUserProfile);
router.put("/update", protect, updateUser);
router.get("/getUser", getUsers);
router.put("/updateUser/:id", updateUserByAdmin)
router.delete("/deleteUser/:id", deleteUser)

export default router;
