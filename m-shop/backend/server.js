import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import productRouter from "./routes/product.route.js";
import userRouter from "./routes/user.route.js";
import adminRouter from "./routes/admin.route.js";
import totalAmountRouter from "./routes/totalAmount.route.js";
import cartRouter from "./routes/cart.route.js";
import wishlistRouter from "./routes/wishlist.route.js";
import paymentRouter from "./routes/payment.route.js";
import ordersRouter from "./routes/order.route.js";
import enqueryMailRouter from "./routes/enqueryMail.route.js";
import orderMailRouter from "./routes/orderMail.route.js";
import { fileURLToPath } from "url";
import path from "path";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8000;

// Set up CORS middleware
app.use(
  cors({
    origin: ["https://m-shop-gq4d.vercel.app", "https://guileless-centaur-857f5a.netlify.app", "https://m-shop-2.onrender.com", "http://localhost:5000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
  );

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

// Set up static folder for file access
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Middleware
app.use(express.json());
app.use(cookieParser());

// API routes
app.use("/api/products", upload.single("image"), productRouter);
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api", totalAmountRouter);
app.use("/api/cart", cartRouter);
app.use("/api/wishlist", wishlistRouter);
app.use("/api", paymentRouter);
app.use("/api", ordersRouter);
app.use("/api", enqueryMailRouter);
app.use("/api", orderMailRouter);

// app.get("/", (req, res) => {
//   res.send("Server is Ready ---");
// });

app.use(express.static(path.join(__dirname, "../frontend/dist"))); // Adjust path if needed

// Fallback route for React
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html")); // Adjust path
   connectDB();
});
app.get('/', (req, res) => {
   res.send("Server is Ready---");
  connectDB();
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
  connectDB();
});
