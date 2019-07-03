var app = require('../../../app');
var express = require('express');
var router = express.Router();
const environment = process.env.NODE_ENV || "development";
const configuration = require("../../../knexfile")[environment];
const database = require("knex")(configuration);
const Food = require('../../../models/food');
const Meal = require('../../../models/meal');



router.get('/', async (request, response) => {
  // var pry = require('pryjs');
  // eval(pry.it);
  try {
    await Meal.query()
        .findById(1)
      }
      catch (error) {
        response.status(404).json({ error })
      }

  // database('meals').select()
  //   .then(meals => {
  //     return response.status(200).json(meals);
  //   })
  //   .catch((error) => {
  //     return response.status(500).json({ error });
  //   });

});



router.post('/:meal_id/foods/:id', async (request, response) => {
  var pry = require('pryjs');
  const food = await Food.query().findById(request.params.id);
  eval(pry.it);

  database('meals').insert(hedgehog, 'id')
    .then((hedgehogId) => {
      return response.status(201).json({ id: hedgehogId[0] });
    })
    .catch((error) => {
      return response.status(500).json({ error });
    });
});

// router.post('/', async (request, response) => {
//   var pry = require('pryjs');
//   eval(pry.it);
//
//   const this = await Meal.query()
//           .insert({ name: 'TestMeal' })
//           .then(meal) => {
//             return response.status(201).json({ id: meal[0] });
//           }
//           .catch((error) => {
//             return response.status(500).json({ error });
//           });
// });



module.exports = router;
