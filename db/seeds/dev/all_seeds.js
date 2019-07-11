let usersData = [
  {
    name: "Jennie Stones",
    email: "jstones0@ted.com",
    password: "password",
    apiKey: "XUrJTVKh20s2"
  },
  {
    name: "Ariana Kidds",
    email: "akidds1@unc.edu",
    password: "password",
    apiKey: "ugHpafDoO3a2"
  },
  {
    name: "Barry Eastbrook",
    email: "beastbrook2@smugmug.com",
    password: "password",
    apiKey: "kcgF8gno38ru"
  }
]

let foodData = [
  {name: 'cheese',
    calories: 113},
  {name: 'apple',
    calories: 95},
  {name: 'turkey',
    calories: 22},
  {name: 'grapes',
    calories: 62},
  {name: 'roll',
    calories: 77},
  {name: 'gushers',
    calories: 90},
  {name: 'carrots',
    calories: 25},
  {name: 'egg',
    calories: 78},
]

let foodMealData = [
  {food_id: 2,
    meal_id: 1},
  {food_id: 8,
    meal_id: 1},
  {food_id: 8,
    meal_id: 1},
  {food_id: 1,
    meal_id: 2},
  {food_id: 3,
    meal_id: 2},
  {food_id: 4,
    meal_id: 2},
  {food_id: 5,
    meal_id: 2},
  {food_id: 7,
    meal_id: 3},
  {food_id: 1,
    meal_id: 4},
  {food_id: 3,
    meal_id: 4},
  {food_id: 5,
    meal_id: 4},
  {food_id: 7,
    meal_id: 4},
  {food_id: 6,
    meal_id: 5}
]

let mealData = [
  {name: 'breakfast',
    user_id: 1},
  {name: 'lunch',
    user_id: 1},
  {name: 'snack',
    user_id: 2},
  {name: 'dinner',
    user_id: 3},
  {name: 'dessert',
    user_id: 3}
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
