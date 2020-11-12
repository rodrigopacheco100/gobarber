import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';
import routes from './routes';

import './database';

import uploadConfig from './config/upload';
import errorHandler from './middlewares/errorHandler';

const app = express();
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use(errorHandler);

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333');
});
