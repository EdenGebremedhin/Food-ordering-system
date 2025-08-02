const express = require("express");
const { getMenu, addMenuItem, deleteMenuItem } = require("../controllers/menuController");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/", getMenu);
router.post("/", protect, adminOnly, addMenuItem);
router.delete("/:id", protect, adminOnly, deleteMenuItem);

module.exports = router;
