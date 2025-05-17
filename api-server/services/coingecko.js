const axios = require('axios');
const CryptoStat = require('../models/CryptoStat');

const COINS = ['bitcoin', 'ethereum', 'matic-network'];

async function storeCryptoStats(){
     try {
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
      params: {
        ids: COINS.join(','),
        vs_currencies: 'usd',
        include_market_cap: 'true',
        include_24hr_change: 'true',
      }
    });

    const data = response.data;

    const statDocs = COINS.map(coin => ({
      coin,
      price_usd: data[coin].usd,
      market_cap_usd: data[coin].usd_market_cap,
      change_24h_percent: data[coin].usd_24h_change,
    }));

    await CryptoStat.insertMany(statDocs);
    console.log("Crypto stats saved:", statDocs);
  } catch (error) {
    console.error("Error fetching/storing crypto stats:", error.message);
  }
}

module.exports = { storeCryptoStats };