const Orders = require("../../models/orders/orders");
const Product = require("../../models/product/product");
const StockHistory = require("../../models/orders/stockHistory");
const amountPayable = require("../../models/ledgers/accountsPayable");
const amountReceivable = require("../../models/ledgers/accountReceivable");

// Add Order Details
const addOrder = async (req, res) => {
  try {
    console.log(req.body);
    const products = req.body.products;
    // Check if there is any product with insufficient stock
    for (let i = 0; i < products.length; i++) {
      const product = products[i].product;
      const quantityToSubtract = products[i].stockOrdered;

      if (product.stock < quantityToSubtract) {
        return res
          .status(400)
          .json({ message: "Insufficient quantity to subtract" });
      }
    }
    for (let j = 0; j < products.length; j++) {
      const product = products[j].product;
      const quantityToSubtract = products[j].stockOrdered;
      const newQuantity = product.stock - quantityToSubtract;

      await Product.findByIdAndUpdate(product._id, { stock: newQuantity });
    }

    const newOrder = await Orders.create({
      code: req.body.code,
      userID: req.body.userID,
      products: req.body.products,
      StoreID: req.body.storeID,
      orderDate: req.body.orderDate,
      totalAmount: req.body.totalAmount,
      paymentMethod: req.body.paymentMethod,
      riderName: req.body.riderName,
    });
    await newOrder.create()
    return res.json({ message: "Order created and stock updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// Get All Orders Data
const getOrderData = async (req, res) => {
  const findAllPurchaseData = await Orders.find()
    .sort({ _id: -1 }) // -1 for descending order
    .populate("userID");
  res.json(findAllPurchaseData);
};

const resolveOrder = async (req, res) => {
  //order should be removed from the orders table
  const orderId = req.params.id;
  console.log(orderId);
  let result = await Orders.findByIdAndDelete(orderId);
  console.log("Result: ", result);
  if (!result) {
    console.log("results empty");
    res.send("No order available");
  } else {
    res.send(result);
    try{
      await StockHistory.create({
        code: result.code,
        userID: result.userID,
        products: result.products,
        StoreID: result.StoreID,
        orderDate: result.orderDate,
        totalAmount: result.totalAmount,
        paymentMethod: result.paymentMethod,
        riderName: result.riderName,
        requestType: "Completed",
      });
      const account = await amountReceivable.find({name:result.StoreID});
      if(account){
        newTransaction = {
          date: new Date(),
          amount: result.totalAmount,
          type: 'credit'
        };
        account.transactions.push(newTransaction);
        const transactionAmount = newTransaction.type === 'credit' ? -newTransaction.amount : newTransaction.amount;
        account.total += transactionAmount;
        await account.save()
      }else{
        res.json("account not found")
      }
    }catch(e){
      res.json(e)
    }
  }
  //order should be added to order history table
};

const cancelOrder = async (req, res) => {
  //order should be removed from the orders table
  const orderId = req.params.id;
  const products = req.body.products;
  console.log(orderId);
  let result = await Orders.findByIdAndDelete(orderId);
  console.log("Result: ", result);
  if (!result) {
    console.log("results empty");
    res.send("No order available");
  } else {
    res.send(result);
    const products = result.products;
    await StockHistory.create({
      code: result.code,
      userID: result.userID,
      products: result.products,
      StoreID: result.StoreID,
      orderDate: result.orderDate,
      totalAmount: result.totalAmount,
      paymentMethod: result.paymentMethod,
      riderName: result.riderName,
      requestType: "Cancelled",
    });
    for (i = 0; i < products.length; i++) {
      const product = products[i].product;
      const newQuantity = product.stock;

      await Product.findByIdAndUpdate(product._id, { stock: newQuantity });
    }
  }
  //order should be added to order history table
};

module.exports = {
  addOrder,
  getOrderData,
  resolveOrder,
  cancelOrder,
};
