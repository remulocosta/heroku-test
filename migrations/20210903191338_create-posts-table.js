
exports.up = function(knex) {
  return knex.schema.createTable('posts', table => {
  table.increments('id').primary()
  table.string('description')
  table.string('image_url', 1000).notNull()
  table.string('latitude').notNull()
  table.string('longitude').notNull()
  table.integer('userId').unsigned().notNullable()
    .references('id').inTable('users')
  table.timestamp('deletedAt')
  });
  };
  
  exports.down = function(knex) {
  return knex.schema.dropTable('posts');
  };
