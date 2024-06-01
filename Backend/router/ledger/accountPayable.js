const express  = require("express");
const router = express();
const accountPayable = require("../../controller/ledger/accountPayable");

router.get("/",accountPayable.getAccountPayable);

module.exports = router;