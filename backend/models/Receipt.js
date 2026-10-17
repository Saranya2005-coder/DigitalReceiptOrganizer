const mongoose = require("mongoose");

const receiptSchema = new mongoose.Schema({
  receiptId: {
    type: String,
    unique: true,
    required: true
  },

  userId: {
    type: String,
    required: true
  },

  categoryId: {
    type: String,
    required: true
  },

  storeName: {
    type: String,
    required: true
  },

  amount: {
    type: Number,
    required: true
  },

  date: {
    type: Date,
    required: true
  },

  receiptImage: {
    type: String
  }
});

module.exports = mongoose.model("Receipt", receiptSchema, "Receipts");