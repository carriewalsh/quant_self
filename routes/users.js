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

router.get('/my_meals', async function(req, res, next) {
  try {
    const meals = await Meal
      .query().eager('foods');
      res.render('my_meals.ejs', {meals: meals});
    }
  catch (error) {
    res.status(404).json({ error })
  }
})
module.exports = router;
