
exports.up = function(knex) {
  return knex.schema.createTable('evaluations', table => {
  table.increments('id').primary()
  table.integer('review').notNull()
  table.decimal('rate', (1,2)).notNull()
  table.integer('postId').unsigned().notNullable()
    .references('id').inTable('posts')
  table.integer('userId').unsigned().notNullable()
    .references('id').inTable('users')
  table.timestamp('deletedAt')
  });
  };
  
  exports.down = function(knex) {
  return knex.schema.dropTable('evaluations');
  };
