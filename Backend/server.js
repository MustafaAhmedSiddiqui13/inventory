const express = require("express");
const { main } = require("./models/index");
const productRoute = require("./router/product");
const storeRoute = require("./router/store");
const orderRoute = require("./router/orders");
const itemRoute = require("./router/items");
const warehouseRoute = require("./router/warehouses");
const warehouseHistoryRoute = require("./router/warehouseHistory");
const itemHistoryRoute = require("./router/itemHistory");
const stockHistoryRoute = require("./router/stockHistory");
const productHistoryRoute = require("./router/productHistory");
const storeHistoryRoute = require("./router/storeHistory");
const cors = require("cors");
const User = require("./models/users");

const app = express();
const PORT = 4000;
main();
app.use(express.json());
app.use(cors());

// Store API
app.use("/api/store", storeRoute);

// Products API
app.use("/api/product", productRoute);

// Orders API
app.use("/api/order", orderRoute);

// Items API
app.use("/api/item", itemRoute);

// Warehouse API
app.use("/api/warehouse", warehouseRoute);

// Warehouse History API
app.use("./api/warehouseHistory", warehouseHistoryRoute);

// Item History API
app.use("./api/itemHistory", itemHistoryRoute);

// Stock History API
app.use("/api/stockHistory", stockHistoryRoute);

// Product History API
app.use("/api/productHistory", productHistoryRoute);

// Store History API
app.use("/api/storeHistory", storeHistoryRoute);

// ------------- Signin --------------
let userAuthCheck;
app.post("/api/login", async (req, res) => {
  console.log(req.body);
  // res.send("hi");
  try {
    const user = await User.findOne({
      phoneNumber: req.body.phoneNumber,
      password: req.body.password,
    });
    console.log("USER: ", user);
    if (user) {
      res.send(user);
      userAuthCheck = user;
    } else {
      res.status(401).send("Invalid Credentials");
      userAuthCheck = null;
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

// Getting User Details of login user
app.get("/api/login", (req, res) => {
  res.send(userAuthCheck);
});
// ------------------------------------

// Registration API
app.post("/api/register", (req, res) => {
  let registerUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    phoneNumber: req.body.phoneNumber,
  });

  registerUser
    .save()
    .then((result) => {
      res.status(200).send(result);
      alert("Signup Successfull");
    })
    .catch((err) => console.log("Signup: ", err));
  console.log("request: ", req.body);
});

// Here we are listening to the server
app.listen(PORT, () => {
  console.log("I am live again");
});
