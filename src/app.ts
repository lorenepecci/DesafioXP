import express from 'express';
import 'express-async-errors';
import erroHttp from './middlewares/error';
import { router } from './routes';

const app = express();
app.use(express.json());
app.use(router);
app.use(erroHttp);

export { app };
