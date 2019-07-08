
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('users', function(table) {
      table.increments('id').primary();
      table.string('email');
      table.string('password');
      table.string('api_key');
      table.timestamps(true,true);
    }),
    knex.schema.table('meals', function(table) {
      table.integer('userId').references('id').inTable('users');
    })
  ])
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.table('meals', function(table) {
      table.dropForeign('userId');
      table.dropColumn('userId');
    })
  ])
};
