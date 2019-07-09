
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('users', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.string('email');
      table.string('password');
      table.string('apiKey')
      table.timestamps(true,true);
    }),

    knex.schema.createTable('foods', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.string('calories');
      table.timestamps(true,true);
    }),
    knex.schema.createTable('meals', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('users.id')
      // table.integer('user_id').references('id').inTable('users').onDelete('CASCADE')
      table.timestamps(true,true);
    }),
    knex.schema.createTable('food_meals', function(table) {
      table.increments('id').primary();
      table.integer('food_id').unsigned()
      table.foreign('food_id').references('foods.id')
      table.integer('meal_id').unsigned()
      table.foreign('meal_id').references('meals.id')
    })
  ])
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('food_meals'),
    knex.schema.dropTable('foods'),
    knex.schema.dropTable('meals'),
    knex.schema.dropTable('users')
  ])
};
