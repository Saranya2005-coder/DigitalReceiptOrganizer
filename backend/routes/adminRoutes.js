const express = require("express");
const {
  authenticateToken,
  authorizeAdmin
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
  "/test",
  authenticateToken,
  authorizeAdmin,
  (req, res) => {
    res.json({
      message: "Admin access granted"
    });
  }
);

module.exports = router;