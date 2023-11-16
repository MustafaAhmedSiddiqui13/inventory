const Product = require("../models/product");
const ProductHistory = require("../models/productHistory");

// Add Post
const addProduct = async (req, res) => {
  try {
    await Product.create({
      userID: req.body.userId,
      name: req.body.name,
      category: req.body.category,
      stock: req.body.stock,
      unitPrice: req.body.unitPrice,
      purchaseDate: req.body.purchaseDate,
      expirationDate: req.body.expirationDate,
    });

    await ProductHistory.create({
      userID: req.body.userId,
      name: req.body.name,
      category: req.body.category,
      stock: req.body.stock,
      unitPrice: req.body.unitPrice,
      purchaseDate: req.body.purchaseDate,
      expirationDate: req.body.expirationDate,
      requestType: "Product Added",
    });

    res.status(200).send({ message: "Product and History it's Created" });
  } catch (e) {
    res.status(402).send({ message: e.message });
  }
};

// Get All Products
const getAllProducts = async (req, res) => {
  const findAllProducts = await Product.find().sort({ expirationDate: 1 }); // -1 for descending;
  res.json(findAllProducts);
};

// Delete Selected Product
const deleteSelectedProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const result = await Product.findByIdAndDelete(productId);
    res.send(result);
    await ProductHistory.create({
      userID: result.userID,
      name: result.name,
      category: result.category,
      stock: result.stock,
      unitPrice: result.unitPrice,
      purchaseDate: result.purchaseDate,
      expirationDate: result.expirationDate,
      requestType: "Product Deleted",
    });
  } catch (e) {
    res.status(402).send(e);
  }
};

// Update Selected Product
const updateSelectedProduct = async (req, res) => {
  try {
    const userId = req.body.userId;
    const updatedResult = await Product.findByIdAndUpdate(
      { _id: req.body.productID },
      {
        userID: req.body.userId,
        name: req.body.name,
        category: req.body.category,
        stock: req.body.stock,
        unitPrice: req.body.unitPrice,
        purchaseDate: req.body.purchaseDate,
        expirationDate: req.body.expirationDate,
      },
      { new: true }
    );
    await ProductHistory.create({
      userID: userId,
      name: updatedResult.name,
      category: updatedResult.category,
      stock: updatedResult.stock,
      unitPrice: updatedResult.unitPrice,
      purchaseDate: updatedResult.purchaseDate,
      expirationDate: updatedResult.expirationDate,
      requestType: "Product Updated",
    });

    console.log(updatedResult);
    res.json(updatedResult);
  } catch (error) {
    console.log(error);
    res.status(402).send("Error");
  }
};

// Search Products
const searchProduct = async (req, res) => {
  const searchTerm = req.query.searchTerm;
  const products = await Product.find({
    name: { $regex: searchTerm, $options: "i" },
  });
  res.json(products);
};

module.exports = {
  addProduct,
  getAllProducts,
  deleteSelectedProduct,
  updateSelectedProduct,
  searchProduct,
};
