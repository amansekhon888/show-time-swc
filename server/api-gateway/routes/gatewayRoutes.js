import express from 'express';
import axios from 'axios';
import { log } from '../shared-code/utils/logger.js';

const router = express.Router();

const catalogServiceUrl = process.env.CATALOG_SERVICE_URL || 'http://catalog-service:5001';

router.get('/', async (req, res, next) => {
  try {
    const response = await axios.get(`${catalogServiceUrl}/movies`);
    return res.json(response.data);
  } catch (error) {
    log(`Gateway GET /movies error: ${error.message}`, 'error');
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const response = await axios.post(`${catalogServiceUrl}/movies`, req.body);
    return res.status(response.status).json(response.data);
  } catch (error) {
    log(`Gateway POST /movies error: ${error.message}`, 'error');
    next(error);
  }
});

export default router;
