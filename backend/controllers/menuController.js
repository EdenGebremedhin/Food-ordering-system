const MenuItem = require("../models/MenuItem");

// Add menu item (admin only)
exports.addMenuItem = async (req, res) => {
  const { name, description, price, category } = req.body;
  try {
    const newItem = await MenuItem.create({ name, description, price, category });
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all menu items
exports.getMenuItems = async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
