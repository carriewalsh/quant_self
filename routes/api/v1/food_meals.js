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
  if (req.body.apiKey) {
    // const users = await database.select('apiKey').from('users')
    // const apis = []
    // users.forEach(user => {
      // apis.push(user['apiKey'])
    // })
    // if (apis.includes(req.body.apiKey)) {
      foodMealsController.index(req,res)
    // }
    // else {
      // res.status(401).json({
        // error: "Unauthorized"
      // })
    // }
  }
  else {
    res.status(401).json({
      error: "Unauthorized"
    })
  }
})

router.post('/:id', async (req,res) => {
  if (req.body.apiKey) {
    // const users = await database.select('apiKey').from('users')
    // const apis = []
    // users.forEach(user => {
      // apis.push(user['apiKey'])
    // })
    // if (apis.includes(req.body.apiKey)) {
      foodMealsController.create(req,res)
    // }
    // else {
      // res.status(401).json({
        // error: "Unauthorized"
      // })
    // }
  }
  else {
    res.status(401).json({
      error: "Unauthorized"
    })
  }
})

router.delete('/:id', async (req,res) => {
  // if (req.body.apiKey) {
    // const users = await database.select('apiKey').from('users')
    // const apis = []
    // users.forEach(user => {
      // apis.push(user['apiKey'])
    // })
    // if (apis.includes(req.body.apiKey)) {
      foodMealsController.destroy(req,res)
    // }
    // else {
      // res.status(401).json({
        // error: "Unauthorized"
      // })
    // }
  // }
  // else {
  //   res.status(401).json({
  //     error: "Unauthorized"
  //   })
  // }
})

module.exports = router;
