const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Import routes
const BlockchainRouter = require("./Routes/blockchain"); // blockchain routes
const DonationRoutes = require("./Routes/donations");    // example old route
const AuthRoutes = require("./Routes/auth");             // example old route
// 👉 Add other routes from your old backend here as needed

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Charity Donation Backend is running!",
    blockchain: "Hardhat integration ready",
    network: "localhost",
  });
});

// Old backend routes (from your old backend)
app.use("/api/donations", DonationRoutes);
app.use("/api/auth", AuthRoutes);
// 👉 Add more routes here: app.use("/api/xxx", require("./Routes/xxx"));

// Blockchain routes
app.use("/api/blockchain", BlockchainRouter);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`⛓️  Blockchain backend ready with Hardhat + Charity APIs`);
});

module.exports = app;
