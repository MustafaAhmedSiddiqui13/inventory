const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    ProductID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    stockOrdered: {
      type: Number,
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
    }
  },
  { timestamps: true }
);

const Order = mongoose.model("order", OrderSchema);
module.exports = Order;
