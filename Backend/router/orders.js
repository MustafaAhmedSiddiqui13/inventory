const express = require("express");
const app = express();
const order = require("../controller/orders");

// Add Purchase
app.post("/add", order.addOrder);

// Get All Purchase Data
app.get("/get/:userID", order.getOrderData);

// Remove Order and update History
app.post("/post/:id", order.resolveOrder);

// Remove Order and update History
app.post("/post/cancel/:id", order.cancelOrder);

module.exports = app;
