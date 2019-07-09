const express = require("express");
const fetch = require('node-fetch');
const router = express.Router();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);
var Food = require('../../../models/food')
var Meal = require('../../../models/meal')
var pry = require('pryjs');

async function index(request,response) {
  try
    {
    const meal = await Meal
      .query()
      .findById(request.params.meal_id)
      .eager('foods');

    response.send(meal)
    }
    catch (error)
      {
        response.status(404).json({ error })
      }
};

async function create(request,response) {
  try
    {
    // Find specific food
    const food = await Food.query().findById(request.params.id)
    const meal = await Meal.query().findById(request.params.meal_id)
    // Connect food to specified meal
    const numRelatedRows = await food.$relatedQuery('meals').relate(meal.id);

    response.status(201).send( 'message: Successfully added ' + food.name + ' to ' + meal.name )
    }
    catch (error)
      {
        response.status(404).json({ error })
      }
};

async function destroy(request,response) {
  try
    {
      const meal = await Meal.query().findById(request.params.meal_id)
      await meal
      .$relatedQuery('foods')
      .unrelate()
      .where('foods.id', request.params.id);

      response.status(200).send( ' message: Successfully unrelated' )
    }
      catch (error)
        {
          response.status(404).json({ error })
        }
};

module.exports = {
  index: index,
  create: create,
  destroy: destroy
}
