const knex = require('knex')({client: 'pg'})
const connection = require('../knexfile')
const { Model } = require('objection')
const knexConnection = knex(connection)
Model.knex(knexConnection)

class Meal extends Model {
  static get tableName () {
    return 'meals'
  }
  static get relationMappings () {
    const Food = require('./food')
    const User = require('./user')

    return {
      foods: {
        relation: Model.ManyToManyRelation,
        modelClass: Food,
        join: {
          from: 'meals.id',
          through: {
            from: 'food_meals.meal_id',
            to: 'food_meals.food_id'
          },
          to: 'foods.id'
        }
      },

      users: {
        relation: Model.BelongsToOneRelation,
        join: {
          from: 'meals.user_id',
          to: 'users.id'
        }
      }
    }
  }
}

module.exports = Meal
