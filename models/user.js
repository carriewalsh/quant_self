const knex = require('knex')({client: 'pg'})
const connection = require('../knexfile')
const { Model } = require('objection')

const knexConnection = knex(connection)

Model.knex(knexConnection)

class User extends Model {
  static get tableName () {
    return 'users'
  }
  static get relationMappings () {
    const Meal = require('./meal')

    return {
      meals: {
        relation: Model.HasManyRelation,
        modelClass: Meal,
        join: {
          from: 'users.id',
          to: 'meals.userId' // do I need to put userId on Meal Model?
        }
      }
    }
  }
}

module.exports = User
