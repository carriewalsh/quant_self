var express = require('express');
var router = express.Router();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);
var Food = require('../models/food.js')
var Meal = require('../models/meal.js')

/* GET home page. */
router.get('/my_foods', async function(req, res, next) {
  try {
    const foods = await Food.query();
    res.render('my_foods.ejs', {foods: foods});
  }
  catch (error) {
    res.status(404).json({error})
  }
})
const pry = require('pryjs')

router.get('/my_meals', async function(req, res) {
  try {
    let meals = await Meal
      .query().eager('foods');
    var totalCalories = {}
    meals.forEach(async meal => {
      totalCalories[meal.id] = await meal.totalCalories()
    })

    res.render('my_meals.ejs', {
      meals: meals,
      totalCalories: totalCalories
    });
    }
  catch (error) {
    res.status(404).json({ error })
  }
})

router.get('/my_meals/:id', async function(req,res) {
  try {
    let meal = await Meal.query().findById(req.params.id).eager('foods');
    var totalCalories = await meal.totalCalories()
    // eval(pry.it)
    res.render('my_meals_id.ejs', {
      meal: meal,
      totalCalories: totalCalories,
      foods: meal["foods"]
    })
  }
  catch (error) {
    res.status(404).json({ error })
  }
})
module.exports = router;
