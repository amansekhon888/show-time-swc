import { log } from '../shared-code/utils/logger.js';

const requestLogger = (req, _res, next) => {
  log(`API Gateway ${req.method} ${req.originalUrl}`);
  next();
};

export default requestLogger;
