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
      }
    }
  }

  totalCalories = async function() {
    const meal = await Meal.query().findById(this.id).eager('foods')
    var total = 0
    meal["foods"].forEach(function(food) {
      total += parseInt(food["calories"])
    })
    // console.log(total)
    return total
  }
}

module.exports = Meal
