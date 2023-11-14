const Orders = require("../models/orders");
const Product = require("../models/product");
const StockHistory = require("../models/stockHistory");

// Add Purchase Details
const addOrder = async (req, res) => {
  try {
    const productId = req.body.productID;
    const quantityToSubtract = req.body.stockOrdered;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.stock < quantityToSubtract) {
      return res.status(400).json({ message: "Insufficient quantity to subtract" });
    }

    const newQuantity = product.stock - quantityToSubtract;

    await Product.findByIdAndUpdate(productId, { stock: newQuantity });

    await Orders.create({
      userID: req.body.userID,
      ProductID: req.body.productID,
      stockOrdered: req.body.stockOrdered,
      orderDate: req.body.orderDate,
      totalAmount: req.body.totalAmount,
      riderName: req.body.riderName,
    });
    return res.json({ message: "Order created and stock updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get All Orders Data
const getOrderData = async (req, res) => {
  const findAllPurchaseData = await Orders.find()
    .sort({ _id: -1 })
    .populate("ProductID"); // -1 for descending order
  res.json(findAllPurchaseData);
};

const resolveOrder = async (req,res) => {
  //order should be removed from the orders table
  const orderId = req.params.id;
  console.log(orderId);
  let result = await Orders.findByIdAndDelete(orderId);
  console.log(result);
  if(!result){
    res.send("No order available");
  }else{
    res.send(result);
    await StockHistory.create({
      userID: result.userID,
      ProductID: result.ProductID,
      stockOrdered: result.stockOrdered,
      orderDate: result.orderDate,
      totalAmount: result.totalAmount,
      riderName: result.riderName,
    })
  }
  //order should be added to order history table

}


module.exports = { addOrder, getOrderData, resolveOrder };
