import amqplib from 'amqplib';
import dotenv from 'dotenv';
import { log } from './shared-code/utils/logger.js';
import { QUEUE_NAMES } from './shared-code/constants/index.js';

dotenv.config();

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://rabbitmq';
const QUEUE = QUEUE_NAMES.BOOKING;

const startListener = async () => {
  try {
    const connection = await amqplib.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();

    await channel.assertQueue(QUEUE, { durable: true });
    log(`Notification Service listening to queue: ${QUEUE}`);

    channel.consume(
      QUEUE,
      (message) => {
        if (message) {
          const content = message.content.toString();
          log(`Received booking message: ${content}`);
          channel.ack(message);
        }
      },
      { noAck: false }
    );
  } catch (error) {
    log(`RabbitMQ connection failed: ${error.message}`, 'error');
    process.exit(1);
  }
};

startListener();
