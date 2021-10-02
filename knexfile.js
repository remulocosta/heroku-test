const { db } = require('./app.config');

module.exports = {
  client: 'mysql2',
  connection: db,
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
