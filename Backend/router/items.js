const express = require("express");
const app = express();
const items = require("../controller/items");

// Add Product
app.post("/add", items.addItem);

// Get All Products
app.get("/get/:userId", items.getAllItems);

// Delete Selected Product Item
app.get("/delete/:id", items.deleteSelectedItem);

// Update Selected Product
app.post("/update", items.updateSelectedItem);

// Search Product
app.get("/search", items.searchItem);

module.exports = app;
