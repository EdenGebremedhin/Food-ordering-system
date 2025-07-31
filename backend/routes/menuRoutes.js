const express = require("express");
const { addMenuItem, getMenuItems } = require("../controllers/menuController");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");


const router = express.Router();

router.post("/", protect, addMenuItem); // Admin can add menu items
router.get("/", getMenuItems);          // Anyone can view menu

module.exports = router;
