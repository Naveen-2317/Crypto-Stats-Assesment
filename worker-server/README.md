
---

## `/worker-server/README.md`

```markdown
# Worker Server - Crypto Stats Background Job

This server runs a background job every 15 minutes to:
- Publish a message to an event queue (NATS, Redis Pub/Sub, or Kafka)
- Notify the API server to collect the latest crypto stats

---

## Tech Stack
- Node.js
- Node-cron (for scheduling)
- NATS (or alternative)
- Dotenv

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Naveen-2317/Crypto-Stats-Assesment.git
cd crypto-stats-assignment/worker-server
