import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  allOrders,
  allOrdersAdmin,
  changeStatus,
  orders,
} from "../controllers/orders.controller.js";

const router = express.Router();

router.route("/orders").post(protect, orders);
router.route("/all-orders").get(protect, allOrders);
router.route("/admin-orders").get(allOrdersAdmin);
router.route("/change-status").post(changeStatus);

export default router;
