const express = require("express");
const app = express();
const stockHistory = require("../controller/stockHistory");

app.get("/get/:userID", stockHistory.getStockHistoryData);

module.exports = app;
