require("node:dns").setServers(["8.8.8.8"]);
const adminRoutes = require("./routes/adminRoutes");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const receiptRoutes = require("./routes/receiptRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json({ limit: "10mb" }));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Atlas Connected");
  })
  .catch((error) => {
    console.log("MongoDB Connection Error:", error.message);
  });

app.use("/api/receipts", receiptRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Digital Receipt Organizer Backend is running");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});