const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    items: {
      type: Object,
      ref: "item",
      required: true,
    },
    packSize: {
      type: Object,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    production: {
      type: String,
      required: true,
    },
    expirationDate: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("product", ProductSchema);
module.exports = Product;
