const mongoose = require("mongoose");

// const amountPayableSchema = new mongoose.Schema(
//   {
//     amount: {
//       type: Number,
//       required: true,
//     },
//     paymentType: {
//       type: String,
//       required: true,
//     },
//     date: {
//       type: Date,
//       default: Date.now(),
//     },
//     orderId: {
//       type: String,
//       required: false,
//     },
//     totalAmount: {
//       type: Number,
//       required: true,
//     },
//     paymentMethod: {
//       type: String,
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

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

const amountPayableSchema = new mongoose.Schema({
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



const amountPayable = mongoose.model("amountPayable", amountPayableSchema);
module.exports = amountPayable;
