const express = require("express");
const { placeOrder, getUserOrders, getAllOrders, updateOrderStatus } = require("../controllers/orderController");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const router = express.Router();

router.post("/", protect, placeOrder);              // Place an order
router.get("/", protect, getUserOrders);            // Get user's orders

// Admin routes
router.get("/admin", protect, adminOnly, getAllOrders);          // Get all orders
router.put("/admin/:id", protect, adminOnly, updateOrderStatus); // Update order status

module.exports = router;
