const accountReceivable = require("../../models/ledgers/accountReceivable");

const getAccountReceivable = async (req, res) => {
  try {
    const name = req.query.encodedName;
    const decodedName = decodeURIComponent(name);
    const result = await accountReceivable.find({ name: decodedName });
    res.json(result);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
};

module.exports = { getAccountReceivable };
