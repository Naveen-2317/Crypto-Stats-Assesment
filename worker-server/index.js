const { connect } = require('nats');
const cron = require('node-cron');
require('dotenv').config();

async function startPublisher() {
  const nc = await connect({ servers: process.env.NATS_URL });

  console.log('Worker connected to NATS');

  cron.schedule('*/15 * * * *', () => {
    const message = JSON.stringify({ trigger: 'update' });
    nc.publish('crypto.update', Buffer.from(message));
    console.log('Published update event to NATS');
  });
}

startPublisher().catch(console.error);
