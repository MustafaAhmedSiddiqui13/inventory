const mongoose = require("mongoose");

const StockHistorySchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    products: {
      type: Array,
      ref: "product",
      required: true,
    },
    StoreID: {
      type: Object,
      ref: "store",
      required: true,
    },
    orderDate: {
      type: String,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    riderName: {
      type: String,
      required: true,
    },
    requestType: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const StockHistory = mongoose.model("stockHistory", StockHistorySchema);
module.exports = StockHistory;
