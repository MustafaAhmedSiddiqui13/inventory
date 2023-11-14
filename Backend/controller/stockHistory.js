const Sales = require("../models/stockHistory");

const getStockHistoryData = async (req, res) => {
  const findAllStockHistoryData = await Sales.find()
    .sort({ _id: -1 })
    .populate("ProductID"); // -1 for descending order
  res.json(findAllStockHistoryData);
};

module.exports = { getStockHistoryData};
