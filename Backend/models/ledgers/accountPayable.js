const mongoose = require("mongoose");


const transactionSchema = new mongoose.Schema({
  date:{
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum:['debit','credit']
  },
});

const accountPayableSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  transactions: [transactionSchema],
  total:{
    type: Number,
    required: true,
  }
})



const accountPayable = mongoose.model("accountPayable", accountPayableSchema);
module.exports = accountPayable;
