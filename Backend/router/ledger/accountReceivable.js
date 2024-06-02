const express = require("express");
const router = express();
const accountReceivable = require("../../controller/ledger/accountReceivable");

router.get("/", accountReceivable.getAccountReceivable);

module.exports = router;
