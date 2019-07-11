var app = require('../../../app');
var express = require('express');
var router = express.Router();
const environment = process.env.NODE_ENV || "development";
const configuration = require("../../../knexfile")[environment];
const database = require("knex")(configuration);
const Food = require('../../../models/food');
// const Meal = require('../../../models/meal');
const pry = require('pryjs')
var mealsController = require('../../../controllers/api/v1/meals_controller')

const { Model } = require('objection');
Model.knex(database)

router.get('/', async (req,res) => {
  // if (req.body.apiKey) {
    // const users = await database.select('apiKey').from('users')
    // const apis = []
    // users.forEach(user => {
      // apis.push(user['apiKey'])
    // })
    // if (apis.includes(req.body.apiKey)) {
      mealsController.index(req,res)
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
