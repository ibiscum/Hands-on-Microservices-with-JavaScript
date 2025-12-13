const express = require('express');
const v1 = require('./routes/v1');
const consumerModule = require('./modules/kafkamodule');
const morganMiddleware = require('./middlewares/morganmiddleware');
const jwtVerifyMiddleware = require('./middlewares/verify');
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const app = express();

app.use(limiter);
app.use(jwtVerifyMiddleware);
app.use(morganMiddleware);

consumerModule();

app.use(express.json());


// V1 API
app.use('/v1', v1);

module.exports = app;
