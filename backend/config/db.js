// config/db.js
const mongoose = require("mongoose");
const auth = require("../middleware/auth");

const connectDB = async () => {
  try {
    // Replace the connection string with your MongoDB URI
    const conn = await mongoose.connect("mongodb://127.0.0.1:27017/charity_db", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
