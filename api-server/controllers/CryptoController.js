const CryptoStat = require('../models/CryptoStat');

const cryproStats = ('/stats', async (req, res) => {
  const { coin } = req.query;

  const validCoins = ['bitcoin', 'ethereum', 'matic-network'];
  if (!validCoins.includes(coin)) {
    return res.status(400).json({ error: 'Invalid coin. Use bitcoin, ethereum, or matic-network.' });
  }

  try {
    const latest = await CryptoStat.findOne({ coin }).sort({ timestamp: -1 });

    if (!latest) {
      return res.status(404).json({ error: 'No data found for the specified coin.' });
    }

    return res.json({
      price: latest.price_usd,
      marketCap: latest.market_cap_usd,
      "24hChange": latest.change_24h_percent,
    });
  } catch (error) {
    console.error('Error fetching latest crypto stat:', error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
});


const cryproDeviation = async (req, res) => {
  const { coin } = req.query;

  const validCoins = ['bitcoin', 'ethereum', 'matic-network'];
  if (!validCoins.includes(coin)) {
    return res.status(400).json({ error: 'Invalid coin. Use bitcoin, ethereum, or matic-network.' });
  }

  try {
    const records = await CryptoStat.find({ coin })
      .sort({ timestamp: -1 })
      .limit(100);

    if (records.length === 0) {
      return res.status(404).json({ error: 'No data found for the specified coin.' });
    }

    const prices = records.map(r => r.price_usd);
    const mean = prices.reduce((acc, val) => acc + val, 0) / prices.length;

    const variance = prices.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / prices.length;
    const stdDev = Math.sqrt(variance);

    return res.json({ standardDeviation: parseFloat(stdDev.toFixed(2)) });
  } catch (error) {
    console.error('Error calculating deviation:', error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  cryproStats,
  cryproDeviation,
}