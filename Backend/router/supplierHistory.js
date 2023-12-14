const express = require("express");
const app = express();
const supplierHistory = require("../controller/supplierHistory");

app.get("/get/:userID", supplierHistory.getSupplierHistoryData);

module.exports = app;
