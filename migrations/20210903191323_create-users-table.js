
exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
  table.increments('id').primary()
  table.string('name').notNull()
  table.integer('age').notNull()
  table.string('city').notNull()
  table.string('email').notNull().unique()
  table.string('password').notNull()
  table.timestamp('deletedAt')
  });
  };
  
  exports.down = function(knex) {
  return knex.schema.dropTable('users');
  };
