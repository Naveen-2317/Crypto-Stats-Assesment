const mongoose = require('mongoose');

const CryptoStatSchema = new mongoose.Schema({
    coin: String,
    price_usd: Number,
    market_cap_usd: Number,
    change_24h_percent: Number,
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("CryptoStat", CryptoStatSchema);