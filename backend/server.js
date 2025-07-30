const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors()); //to allow cross-origin requests
app.use(express.json()); //to paarse json body

// Routes
app.get("/", (req, res) => {
  res.send("Restaurant Ordering API is running...");
});

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);


app.post("/test", (req, res) => {
    console.log("✅ Test route hit!", req.body);
    res.json({ message: "POST test route works", data: req.body });
  });
  

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
