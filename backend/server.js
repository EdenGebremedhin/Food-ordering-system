const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
dotenv.config();



// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: "*",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization"
}));

const protect = require("./middleware/authMiddleware");
app.get("/api/protected", protect, (req, res) => {
    res.json({ message: `Welcome ${req.user.name}, you are authorized!` });
  });
  


app.use(express.json());

// Debug Logger
app.use((req, res, next) => {
  console.log(`➡️ ${req.method} ${req.url}`);
  next();
});

// Root route
app.get("/", (req, res) => {
  res.send("Restaurant Ordering API is running...");
});

// Test route
app.post("/test", (req, res) => {
  console.log("✅ Test route hit!", req.body);
  res.json({ message: "POST test route works", data: req.body });
});

// Auth routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

//Menu and order routes
const menuRoutes = require("./routes/menuRoutes");
app.use("/api/menu", menuRoutes);

const orderRoutes = require("./routes/orderRoutes");
app.use("/api/orders", orderRoutes);




// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
