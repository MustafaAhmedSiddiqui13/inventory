const express = require("express");
const app = express();
const storeHistory = require("../controller/storeHistory");

app.get("/get/:userID", storeHistory.getStoreHistoryData);

module.exports = app;
