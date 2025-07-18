const mongoose = require("mongoose");
const { storeCryptoStats } = require('../services/coingecko');

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("DB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1); // Exit process if connection fails
    }
}

module.exports = connectDB;
