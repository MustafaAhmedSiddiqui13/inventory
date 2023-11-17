const Store = require("../models/store");
const StoreHistory = require("../models/storeHistory");

const addStore = async (req, res) => {
  try {
    await Store.create({
      userID: req.body.userId,
      name: req.body.name,
      category: req.body.category,
      address: req.body.address,
      city: req.body.city,
    });

    await StoreHistory.create({
      userID: req.body.userId,
      name: req.body.name,
      category: req.body.category,
      address: req.body.address,
      city: req.body.city,
      requestType: "Vendor Created",
    });
    res.status(200).send({ message: "Vendor and History it's Created" });
  } catch (e) {
    res.status(402).send({ message: e.message });
  }
};

//Delete Store and Create its History
const deleteStore = async (req, res) => {
  try {
    const storeId = req.params.id;
    const result = await Store.findByIdAndDelete(storeId);
    res.send(result);
    await StoreHistory.create({
      userID: result.userID,
      name: result.name,
      category: result.category,
      address: result.address,
      city: result.city,
      requestType: "Vendor Deleted",
    });
  } catch (e) {
    res.status(402).send(e);
  }
};

// Get All Stores
const getAllStores = async (req, res) => {
  const findAllStores = await Store.find().sort({
    _id: -1,
  }); // -1 for descending;
  res.json(findAllStores);
};

module.exports = { addStore, getAllStores, deleteStore };
