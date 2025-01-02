import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import { getTotalAmount } from "../controllers/totalAmount.controller.js";

const router = express.Router();

router.route("/totalAmount").get(protect, getTotalAmount);

export default router;
