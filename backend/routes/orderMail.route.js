import express from "express";
import { sendOrderMail } from "../controllers/orderMail.controller.js";

const router = express.Router();

router.route("/order-mail").post(sendOrderMail);

export default router;
