const accountPayable = require("../../models/ledgers/accountPayable");

const getAccountPayable = async (req, res) => {
  try {
    const name = req.query.encodedName;
    const decodedName = decodeURIComponent(name);
    const result = await accountPayable.find({ name: decodedName });
    res.json(result);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
};

module.exports = { getAccountPayable };
