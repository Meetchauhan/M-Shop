import express from "express";

import { sendMail } from "../controllers/enqueryMail.controller.js";

const router = express.Router();

router.route("/send-mail").post(sendMail);

export default router;
