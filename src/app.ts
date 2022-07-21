import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import { middlewareErro } from './middlewares/error';
import { router } from './routes';

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);
app.use(middlewareErro);
export { app };
