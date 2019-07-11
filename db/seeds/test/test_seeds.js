let usersData = [
  {
    name: "Jennie Stones",
    email: "jstones0@ted.com",
    password: "password",
    apiKey: "XUrJTVKh20s2"
  }
]

let foodData = [
  {name: 'cheese',
    calories: 113}
]

let foodMealData = [
  {food_id: 1,
    meal_id: 1}
]

let mealData = [
  {name: 'breakfast',
    user_id: 1}
  ]

const createUser = (knex,user) => {
  return knex('users').insert({
    name: user.name,
    email: user.email,
    password: user.password,
    apiKey: user.apiKey
  })
}


const createFood = (knex,food) => {
  return knex('foods').insert({
    name: food.name,
    calories: food.calories
  })
}

const createFoodMeal = (knex,foodMeal) => {
  return knex('food_meals').insert({
    food_id: foodMeal.food_id,
    meal_id: foodMeal.meal_id
  })
}

const createMeal = (knex,meal) => {
  return knex('meals').insert({
    name: meal.name,
    user_id: meal.user_id
  })
}
var pry = require('pryjs');
exports.seed = function(knex) {
  return knex('food_meals').del()
    .then(() => knex('meals').del())
    .then(() => knex('foods').del())
    .then(() => {
      let promises = []
      usersData.forEach(user => {
        promises.push(createUser(knex, {
          name: user.name,
          email: user.email,
          password: user.password,
          apiKey: user.apiKey
        }))
      })

      foodData.forEach(food => {
        promises.push(createFood(knex,{
          name: food.name,
          calories: food.calories
        }))
      });

      mealData.forEach(meal => {
        promises.push(createMeal(knex,{
          name: meal.name,
          user_id: meal.user_id
        }))
      });

      foodMealData.forEach(foodMeal => {
        promises.push(createFoodMeal(knex,{
          food_id: foodMeal.food_id,
          meal_id: foodMeal.meal_id
        }))
      });

      return Promise.all(promises);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
