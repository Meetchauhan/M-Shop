import express from "express";
import { registrationMail } from "../controllers/registerMail.controller.js";

const router = express.Router();

router.route("/registration-mail").post(registrationMail);

export default router;
