import express from "express";
import {
  logoutAdmin,
  createAdmin,
  loginAdmin,
  getAdminProfile,
} from "../controllers/admin.controller.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", createAdmin);
router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);
router.route("/profile").get(protectAdmin, getAdminProfile);

export default router;
