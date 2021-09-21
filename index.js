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

app.listen(process.env.PORT, () => {
  console.log('running backend on port 5000');
});
