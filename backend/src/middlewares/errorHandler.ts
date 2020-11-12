import { ErrorRequestHandler } from 'express';
import AppError from '../errors/AppError';

const errorHandler: ErrorRequestHandler = (
  err: Error,
  request,
  response,
  _,
) => {
  console.log(err);

  if (err instanceof AppError)
    return response
      .status(err.statusCode)
      .json({ status: 'error', message: err.message });

  return response
    .status(500)
    .json({ status: 'error', message: 'Internal server error' });
};

export default errorHandler;
