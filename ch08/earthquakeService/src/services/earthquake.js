const Kafka = require('node-rdkafka');
const { createConfig } = require('../config/config');
const path = require('path');
const crypto = require('crypto');

class EarthquakeEventProducer {
  constructor() {
    this.intervalId = null;
  }
  #generateEarthquakeEvent() {
    return {
      // 8 random bytes = 16 hex characters, similar to the original
      id: crypto.randomBytes(8).toString('hex'),
      // Magnitude between 0 (inclusive) and 9 (exclusive), up to 5 decimals
      magnitude: crypto.randomInt(0, 900000) / 100000,
      location: {
        // Latitude between -90 (inclusive) and +90 (exclusive), up to 5 decimals
        latitude: (crypto.randomInt(0, 18000000) / 100000) - 90,
        // Longitude between -180 (inclusive) and +180 (exclusive), up to 5 decimals
        longitude: (crypto.randomInt(0, 36000000) / 100000) - 180,
      },
      timestamp: Date.now(),
    };
  }

  async runEarthquake() {
    const configPath = path.join(__dirname, '../../configs/.env');
    const appConfig = createConfig(configPath);

    // Returns a new writable stream
    const stream = Kafka.Producer.createWriteStream({
      'metadata.broker.list': appConfig.kafka.brokers,
      'client.id': appConfig.kafka.clientID
    }, {}, {
      topic: appConfig.kafka.topic
    });

    // To make our stream durable we listen to this event
    stream.on('error', (err) => {
      console.error('Error in our kafka stream');
      console.error(err);
    });

    this.intervalId = setInterval(async () => {
      const event = await this.#generateEarthquakeEvent();
      // Writes a message to the stream
      const queuedSuccess = stream.write(Buffer.from(JSON.stringify(event)));

      if (queuedSuccess) {
        console.log('The message has been queued!');
      } else {
        // If the stream's queue is full
        console.log('Too many messages in queue already');
      }
    }, 100);
  }

  stopEarthquake() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      console.log('Earthquake event stream stopped.');
    } else {
      console.log('No running earthquake event stream to stop.');
    }
  }
}

module.exports = EarthquakeEventProducer;