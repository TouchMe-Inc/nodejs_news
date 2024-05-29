import 'reflect-metadata';
import express from 'express';
import {useContainer, useExpressServer} from 'routing-controllers';
import {Container} from 'typedi';
import {controllers} from './controllers';
import {middlewares} from "./middlewares";

useContainer(Container);

const app: express.Express = express();

useExpressServer(app, {
    routePrefix: '/api',
    defaultErrorHandler: false,
    interceptors: [],
    controllers,
    middlewares
});

export default app;