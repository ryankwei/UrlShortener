import express from 'express';
require('express-async-errors');
import cors from 'cors';
import userRouter from '../routes/users';
import loginRouter from '../routes/login';
import linkRouter from '../routes/links';
import { config, logger, middleware } from '../utils';
import mongoose from 'mongoose';

logger.info('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

const app = express();
app.use(cors())
app.use(express.static('build'))
app.use(express.json());

app.use(middleware.requestLogger);
//app.use(middleware.tokenExtractor);

app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use('/api/links', linkRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;