import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from '@shared/infra/http/routes';

import '@shared/infra/typeorm';
import '@shared/container';

import uploadConfig from '@config/upload';
import errorHandler from '@shared/infra/http/middlewares/errorHandler';

const server = express();

server.use(cors());
server.use(express.json());

server.use('/files', express.static(uploadConfig.directory));
server.use(routes);

server.use(errorHandler);

export default server;
