const express = require("express");
const fetch = require('node-fetch');
const router = express.Router();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);
var Food = require('../../../models/food')
var Meal = require('../../../models/meal')
var pry = require('pryjs');
var session = require('../../../models/POJOs/session')

async function index(request,response) {
  try {
    const id = await database.select('id').from('users').where('apiKey',session.apiKey)
    const meals = await Meal
      .query().where('user_id',id[0]["id"])
      .eager('foods');
    response.send(meals)
    }
    catch (error) {
      response.status(404).json({ error })
    }
};

module.exports = {
  index: index
}
