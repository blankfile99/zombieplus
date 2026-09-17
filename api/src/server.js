"use strict";

const app = require('./app');

const PORT = process.env.PORT || 3000;
const APP_NAME = process.env.APP_NAME || "zombieplus-api";

app.listen(PORT, '0.0.0.0', () => {
  console.log(`${APP_NAME} up! port: ${PORT}`);
});
