var express = require('express');
var router = express.Router();
var fetch = require('node-fetch')
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);
var Food = require('../models/food.js')
var Meal = require('../models/meal.js')
const pry = require('pryjs')


// router.get('/my_foods', async function(req, res, next) {
//   try {
//     const foods = await Food.query();
//     res.render('my_foods.ejs', {foods: foods});
//   }
//   catch (error) {
//     res.status(404).json({error})
//   }
// })

router.get('/my_foods', (req,res) => {
  fetch('https://stormy-brushlands-92125.herokuapp.com/api/v1/foods')
    .then(response => {
      if (response.ok) {
        return response.json();}
        throw new Error('Request Failed.');},
        networkError => console.log(networkError.message))
    .then(foods => {
      res.render('my_foods.ejs', {foods: foods})
    })
    .catch((error) => {
        console.log(error)
      })
  })

// router.get('/my_meals', async function(req, res) {
//   try {
//     let meals = await Meal
//       .query().eager('foods');
//     var totalCalories = {}
//     meals.forEach(async meal => {
//       totalCalories[meal.id] = await meal.totalCalories()
//     })
//
//     res.render('my_meals.ejs', {
//       meals: meals,
//       totalCalories: totalCalories
//     });
//     }
//   catch (error) {
//     res.status(404).json({ error })
//   }
// })

router.get('/my_meals', (req,res) => {
  fetch('https://stormy-brushlands-92125.herokuapp.com/api/v1/meals')
    .then(response => {
      if (response.ok) {
        return response.json();}
        throw new Error('Request Failed.');},
        networkError => console.log(networkError.message))
    .then(meals => {
      let totalCalories = {}
      meals.forEach(meal => {
        totalCalories[meal.id] = 0
        meal["foods"].forEach(food => {
          totalCalories[meal.id] += parseInt(food["calories"])
        })
      })
      res.render('my_meals.ejs', {
        meal: undefined, //this is bad
        meals: meals,
        totalCalories: totalCalories
      })
    })
    .catch((error) => {
        console.log(error)
      })
  });

router.get('/my_meals/:id', (req,res) => {
  fetch(`https://stormy-brushlands-92125.herokuapp.com/api/v1/meals/${req.params.id}/foods`)
  .then(response => {
    if (response.ok) {
      return response.json();}
      throw new Error('Request Failed.');},
      networkError => console.log(networkError.message))
  .then(meal => {
    let totalCalories = 0;
    meal["foods"].forEach(food => {
      totalCalories += parseInt(food["calories"])
    })
    res.render('my_meals.ejs', {
      meals: undefined, //this is bad
      meal: meal,
      totalCalories: totalCalories,
      foods: meal["foods"]
    })
  })
  .catch((error) => {
      console.log(error)
    })
});

// router.get('/my_meals/:id', async function(req,res) {
//   try {
//     let meal = await Meal.query().findById(req.params.id).eager('foods');
//     var totalCalories = await meal.totalCalories()
//     // eval(pry.it)
//     res.render('my_meals.ejs', {
//       meal: meal,
//       totalCalories: totalCalories,
//       foods: meal["foods"]
//     })
//   }
//   catch (error) {
//     res.status(404).json({ error })
//   }
// })
module.exports = router;
