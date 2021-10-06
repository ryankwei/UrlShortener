import app from './app';
import http from 'http';
import { config, logger } from '../utils';


const server = http.createServer(app);
server.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`);
})
