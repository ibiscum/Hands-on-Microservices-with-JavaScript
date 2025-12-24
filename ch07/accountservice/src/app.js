const express = require('express');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const v1 = require('./routes/v1');
const consumerModule = require('./modules/kafkamodule');

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "account service",
      version: "0.1.0",
      description:
        "chapter 07 account service",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "",
        url: "",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3001",
      },
    ],
  },
  apis: ["./routes/v1/accounts/swagger.js"],
};

const specs = swaggerJsdoc(options);
const app = express();

app.use(
  "/api",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

consumerModule();
// service
app.use(express.json());


// V1 API
app.use('/v1', v1);

module.exports = app;
