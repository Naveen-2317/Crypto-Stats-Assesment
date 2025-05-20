#  API Server - Crypto Stats

This server handles:
- Fetching and storing live cryptocurrency stats (price, market cap, 24h change)
- Exposing APIs to retrieve the latest data and calculate price deviation
- Subscribing to background job events via NATS (or Redis/Kafka)

---

##  Tech Stack
- Node.js
- Express.js
- MongoDB (Mongoose)
- NATS (Event Queue)
- CoinGecko API

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/crypto-stats-assignment.git
cd crypto-stats-assignment/api-server
