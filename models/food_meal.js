const knex = require('knex')({client: 'pg'})
const connection = require('../knexfile')
const { Model } = require('objection')
const knexConnection = knex(connection)
Model.knex(knexConnection)

class FoodMeal extends Model {
  static get tableName () {
    return 'meal_foods'
  }
  static get relationMappings () {
    const Food = require('./food')
    const Meal = require('./meal')

    return {
      foods: {
        relation: Model.BelongsToOneRelation,
        modelClass: Food,
        join: {
          from: 'food_id',
            to: 'foods.id'
        }
      },
      meals: {
        relation: Model.BelongsToOneRelation,
        modelClass: Meal,
        join: {
          from: 'meal_id',
            to: 'meals.id'
        }
      }
    }
  }
}

module.exports = FoodMeal;
