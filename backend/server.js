const dotenv = require("dotenv");
const app = require("./app");
const express = require("express");
const connectDB = require("./config/DB");
const morgan = require("morgan");
const cors = require("cors");

// Constants
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";

dotenv.config({ path: "./.env" });
connectDB();

app.use(express.json());
app.use(morgan(NODE_ENV === "development" ? "dev" : "combined")); // Logging middleware

app.listen(PORT, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
