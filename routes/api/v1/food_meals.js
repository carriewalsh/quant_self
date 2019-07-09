var app = require('../../../app');
var express = require('express');
var router = express.Router( { mergeParams: true } );
const environment = process.env.NODE_ENV || "development";
const configuration = require("../../../knexfile")[environment];
const database = require("knex")(configuration);
const Food = require('../../../models/food');
const Meal = require('../../../models/meal');
const pry = require('pryjs')
var foodMealsController = require('../../../controllers/api/v1/food_meals_controller')

// router.param('id', function(req, res, next, id) {
//   req.mealId = id;
// });

router.get('/', async (req,res) => {
  foodMealsController.index(req,res)
})

router.post('/:id', async (req,res) => {
  foodMealsController.create(req,res)
})

router.delete('/:id', async (req,res) => {
  foodMealsController.destroy(req,res)
})

module.exports = router;
