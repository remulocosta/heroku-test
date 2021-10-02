const app = require('express')();
const consign = require('consign');
const db = require('./config/db');

app.db = db;

consign()
  .include('./config/passport.js')
  .then('./config/middlewares.js')
  .then('./api/validation.js')
  .then('./api')
  .then('./config/routes.js')
  .into(app);

const APP_PORT = process.env.PORT || 5000;

app.listen(APP_PORT, () => {
  console.log(`running backend on port ${APP_PORT}`);
});
