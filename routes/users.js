var express = require('express');
var router = express.Router();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);
var Food = require('../models/food.js')

/* GET home page. */
router.get('/my_foods', async function(req, res, next) {
  foods = await Food.query();
  console.log(foods)
  res.render('my_foods.ejs', {foods: foods});

module.exports = router;
