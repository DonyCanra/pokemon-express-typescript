import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import router from './routes';
import cors from 'cors';
import api from './api';

require('dotenv').config();
const app = express();

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);


app.options('*', cors());

app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());

app.use(router);
app.use('/api/v1', api);

export default app;
