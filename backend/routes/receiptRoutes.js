const express = require("express");
const mongoose = require("mongoose");
const Receipt = require("../models/Receipt");
const { authenticateToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authenticateToken);

// Test Receipt API
router.get("/", (req, res) => {
  res.send("Receipt API is working");
});

// Add Receipt
router.post("/", async (req, res) => {
  try {
    const receipt = new Receipt(req.body);
    const savedReceipt = await receipt.save();

    res.status(201).json(savedReceipt);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

// Get All Receipts
router.get("/all", async (req, res) => {
  try {
    const receipts = await Receipt.find(
      {},
      "receiptId userId categoryId storeName amount date receiptImage"
    );

    res.json(receipts);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// Get Receipt by MongoDB ID
router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid receipt ID"
      });
    }

    const receipt = await Receipt.findById(req.params.id);

    if (!receipt) {
      return res.status(404).json({
        message: "Receipt not found"
      });
    }

    res.json(receipt);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// Update Receipt
router.put("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid receipt ID"
      });
    }

    const updatedReceipt = await Receipt.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedReceipt) {
      return res.status(404).json({
        message: "Receipt not found"
      });
    }

    res.json(updatedReceipt);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

// Delete Receipt
router.delete("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid receipt ID"
      });
    }

    const deletedReceipt = await Receipt.findByIdAndDelete(
      req.params.id
    );

    if (!deletedReceipt) {
      return res.status(404).json({
        message: "Receipt not found"
      });
    }

    res.json({
      message: "Receipt deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;