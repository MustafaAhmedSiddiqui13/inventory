const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
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
  },
  { timestamps: true }
);


const Product = mongoose.model("product", ProductSchema);
module.exports = Product;
