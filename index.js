const app = require('express')();
const consign = require('consign');
const db = require('./knexfile');

app.db = db;

consign()
  .include('./config/passport.js')
  .then('./config/middlewares.js')
  .then('./api/validation.js')
  .then('./api')
  .then('./config/routes.js')
  .into(app);

app.listen(process.env.PORT || 5000, () => {
  console.log('running backend on port 5000');
});
