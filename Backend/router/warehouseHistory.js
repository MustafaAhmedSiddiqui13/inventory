const express = require("express");
const app = express();
const warehouseHistory = require("../controller/warehouseHistory");

app.get("/get/:userID", warehouseHistory.getWarehouseHistoryData);

module.exports = app;
