var app = require('../../../app');
var express = require('express');
var router = express.Router();
const environment = process.env.NODE_ENV || "development";
const configuration = require("../../../knexfile")[environment];
const database = require("knex")(configuration);
const Food = require('../../../models/food');
const Meal = require('../../../models/meal');
const pry = require('pryjs')
var mealsController = require('../../../controllers/api/v1/meals_controller')


router.get('/', async (req,res) => {
  mealsController.index(req,res)
})

module.exports = router;
