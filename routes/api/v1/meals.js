var app = require('../../../app');
var express = require('express');
var router = express.Router();
const environment = process.env.NODE_ENV || "development";
const configuration = require("../../../knexfile")[environment];
const database = require("knex")(configuration);
const Food = require('../../../models/food');
const Meal = require('../../../models/meal');
const pry = require('pryjs')



router.get('/', async (request, response) => {
  try {
    const meals = await Meal
      .query()
      .eager('foods');
    response.send(meals)
    }
    catch (error) {
      response.status(404).json({ error })
    }
});


// testing endpoint
router.post('/', async (request, response) => {
  try
    {
      const newMeal = await Meal
                        .query()
                        .insert( { name: request.body.name} )
      response.setHeader("Content-Type", "application/json");
      response.send(JSON.stringify({
        "message": `${request.body.name} has been added to your meals`,
        "data": newMeal
      }))

    } catch (error) {
      eval(pry.it)
        response.status(404).json( { error} );
      };
});


router.post('/:meal_id/foods/:id', async (request, response) => {
  try
    {
    // Find specific food
    const food = await Food.query().findById(request.params.id)
    const meal = await Meal.query().findById(request.params.meal_id)
    // Connect food to specified meal
    const numRelatedRows = await food.$relatedQuery('meals').relate(meal.id);

    response.send( 'message: Successfully added ' + food.name + ' to ' + meal.name )
    }
    catch (error)
      {
        response.status(404).json({ error })
      }
});

router.get('/:meal_id/foods', async (request, response) => {
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
});

router.delete('/:meal_id/foods/:id', async (request, response) => {
  try
    {
      const meal = await Meal.query().findById(request.params.meal_id)
      await meal
      .$relatedQuery('foods')
      .unrelate()
      .where('id', request.params.id)
      response.status(204)
    }
      catch (error)
        {
          response.status(404).json({ error })
        }
});

module.exports = router;
