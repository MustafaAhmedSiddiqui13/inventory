const Supplier = require("../../models/suppliers/supplier");
const SupplierHistory = require("../../models/suppliers/supplierHistory");

// Add Supplier
const addSupplier = async (req, res) => {
  try {
    await Supplier.create({
      userID: req.body.userId,
      name: req.body.name,
      city: req.body.city,
      address: req.body.address,
    });

    await SupplierHistory.create({
      userID: req.body.userId,
      name: req.body.name,
      city: req.body.city,
      address: req.body.address,
      requestType: "Supplier Created",
    });

    res.status(200).send({ message: "Supplier and History it's Created" });
  } catch (e) {
    res.status(402).send({ message: e.message });
  }
};

// Get All Suppliers
const getAllSuppliers = async (req, res) => {
  const findAllSuppliers = await Supplier.find().sort({
    _id: -1,
  });
  res.json(findAllSuppliers);
};

// Delete Selected Supplier
const deleteSelectedSupplier = async (req, res) => {
  try {
    const supplierId = req.params.id;
    const result = await Supplier.findByIdAndDelete(supplierId);
    res.send(result);
    await SupplierHistory.create({
      userID: result.userID,
      name: result.name,
      city: result.city,
      address: result.address,
      requestType: "Supplier Deleted",
    });
  } catch (e) {
    res.status(402).send(e);
  }
};

// Update Selected Supplier
const updateSelectedSupplier = async (req, res) => {
  try {
    const userId = req.body.userId;
    const updatedResult = await Supplier.findByIdAndUpdate(
      { _id: req.body.supplierID },
      {
        userID: req.body.userId,
        name: req.body.name,
        city: req.body.city,
        address: req.body.address,
      },
      { new: true }
    );
    await SupplierHistory.create({
      userID: userId,
      name: updatedResult.name,
      city: updatedResult.city,
      address: updatedResult.address,
      requestType: "Supplier Updated",
    });

    console.log(updatedResult);
    res.json(updatedResult);
  } catch (error) {
    console.log(error);
    res.status(402).send("Error");
  }
};

// Search Supplier
const searchSupplier = async (req, res) => {
  const searchTerm = req.query.searchTerm;
  const suppliers = await Supplier.find({
    name: { $regex: searchTerm, $options: "i" },
  });
  res.json(suppliers);
};

module.exports = {
  addSupplier,
  getAllSuppliers,
  deleteSelectedSupplier,
  updateSelectedSupplier,
  searchSupplier,
};
