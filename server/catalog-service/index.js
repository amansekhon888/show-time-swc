import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import movieRoutes from './routes/movieRoutes.js';
import { log } from './shared-code/utils/logger.js';
import { errorHandler } from './shared-code/utils/errorHandler.js';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.CATALOG_SERVICE_PORT || 5001;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://mongodb:27017/catalog';

mongoose
  .connect(MONGO_URL)
  .then(() => log('Catalog Service connected to MongoDB'))
  .catch((error) => {
    log(`MongoDB connection error: ${error.message}`, 'error');
    process.exit(1);
  });

app.use('/movies', movieRoutes);

app.get('/', (_req, res) => {
  res.json({ message: 'Catalog Service is running' });
});

app.use(errorHandler);

app.listen(PORT, () => log(`Catalog Service listening on port ${PORT}`));
