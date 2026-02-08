import express from 'express';
const v1 = require('./routes/v1').default;

const app = express();

app.use(express.json());

// V1 API
app.use('/v1', v1);

export default app;
