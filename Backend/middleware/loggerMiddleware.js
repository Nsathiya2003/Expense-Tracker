import { logger } from '../utils/logger.js';

const loggerMiddleware = (req, res, next) => {
  logger.info(`Request received: ${req.method} ${req.url}`);
  next();
};

export default loggerMiddleware;
