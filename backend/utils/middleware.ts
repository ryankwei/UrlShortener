import { logger } from './logger';
import express from 'express';
//import { TokenRequest } from '../types';
const requestLogger = (request: express.Request, _response: express.Response, next: express.NextFunction) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (_request: express.Request, response: express.Response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error: Error, _request: express.Request, _response: express.Response, next: express.NextFunction) => {
  logger.error(error.message)

//   if (error.name === 'CastError' && error.kind === 'ObjectId') {
//     return response.status(400).send({ error: 'malformatted id' })
//   } else if (error.name === 'ValidationError') {
//     return response.status(400).json({ error: error.message })
//   }

  next(error)
}

// const tokenExtractor = (request: TokenRequest, _response: express.Response, next: express.NextFunction) => {
//   const authorization = request.get('authorization')
//   if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
// //    request["token"] = authorization.substring(7);
//     request.token = authorization.substring(7);
//   }
//   // else {
//   //   request.push({
//   //       "token": ""
//   //   })
//   // }
//   next()
// }

export const middleware = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
}