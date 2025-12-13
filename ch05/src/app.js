import express, { json } from 'express';
import v1 from './routes/v1/index.js';

const app = express();

// service
app.use(json());


// V1 API
app.use('/v1', v1);

export default app;
