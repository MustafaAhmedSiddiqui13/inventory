const mongoose = require("mongoose");

const ProductHistorySchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    unitPrice: {
      type: Number,
      required: true,
    },
    purchaseDate: {
      type: String,
      required: true,
    },
    expirationDate: {
      type: String,
      required: true,
    },
    requestType: {
      type: String,
      requried: true,
    },
  },
  { timestamps: true }
);

const ProductHistory = mongoose.model("productHistory", ProductHistorySchema);
module.exports = ProductHistory;
