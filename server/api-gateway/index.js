import express from 'express';
import dotenv from 'dotenv';
import gatewayRoutes from './routes/gatewayRoutes.js';
import { log } from './shared-code/utils/logger.js';
import { errorHandler } from './shared-code/utils/errorHandler.js';
import requestLogger from './middleware/logMiddleware.js';

dotenv.config();

const app = express();
const PORT = process.env.API_GATEWAY_PORT || 5000;

app.use(express.json());
app.use(requestLogger);

app.use('/movies', gatewayRoutes);

app.get('/', (_req, res) => {
  res.json({ message: 'API Gateway is running' });
});

app.use(errorHandler);

app.listen(PORT, () => log(`API Gateway listening on port ${PORT}`));
