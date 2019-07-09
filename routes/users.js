var express = require('express');
var router = express.Router();
var fetch = require('node-fetch')
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);
var Food = require('../models/food.js')
var Meal = require('../models/meal.js')
var User = require('../models/user.js')
var usersController = require('../controllers/users_controller')

const pry = require('pryjs')
var validator = require('email-validator');

var session = require('../models/POJOs/session')


router.get('/my_foods', (req,res) => {
  fetch('https://stormy-brushlands-92125.herokuapp.com/api/v1/foods')
    .then(response => {
      if (response.ok) {
        return response.json();}
        throw new Error('Request Failed.');},
        networkError => console.log(networkError.message))
    .then(foods => {
      res.render('my_foods.ejs', {foods: foods})
    })
    .catch((error) => {
        console.log(error)
      })
  })



router.get('/my_meals', (req,res) => {
  fetch('https://stormy-brushlands-92125.herokuapp.com/api/v1/meals')
    .then(response => {
      if (response.ok) {
        return response.json();}
        throw new Error('Request Failed.');},
        networkError => console.log(networkError.message))
    .then(meals => {
      let totalCalories = {}
      meals.forEach(meal => {
        totalCalories[meal.id] = 0
        meal["foods"].forEach(food => {
          totalCalories[meal.id] += parseInt(food["calories"])
        })
      })
      res.render('my_meals.ejs', {
        meal: undefined, //this is bad
        meals: meals,
        totalCalories: totalCalories
      })
    })
    .catch((error) => {
        console.log(error)
      })
  });


router.get('/my_meals/:id', (req,res) => {
  fetch(`https://stormy-brushlands-92125.herokuapp.com/api/v1/meals/${req.params.id}/foods`)
  .then(response => {
    if (response.ok) {
      return response.json();}
      throw new Error('Request Failed.');},
      networkError => console.log(networkError.message))
  .then(meal => {
    let totalCalories = 0;
    meal["foods"].forEach(food => {
      totalCalories += parseInt(food["calories"])
    })
    res.render('my_meals.ejs', {
      meals: undefined, //this is bad
      meal: meal,
      totalCalories: totalCalories,
      foods: meal["foods"]
    })
  })
  .catch((error) => {
      console.log(error)
    })
});

router.get('/login', (req,res) => {
  res.render('login.ejs')
})

router.post('/sessions', (req,res) => {
  usersController.login(req,res)
  // if (validator.validate(email)) {
  //   const user = User.query()
  //     .where(email, email)
  //     .then(result => {
  //     if (result) {
  //       let passwordHash = result["dataValues"]["password"]
  //       let apiKey = result["dataValues"]["api_key"]
  //       let verify = bcrypt.compare(passwordAttempt, passwordHash)
  //       .then(comparison => {
  //         if (comparison) {
  //           session.addKey(apiKey) //will this work
  //         }
  //         else {
  //           res.setHeader("Content-Type", "application/json");
  //           res.status(404).json({
  //             error: "Email and password do not match."
  //           });
  //         }
  //       }).catch(error => {
  //           res.setHeader("Content-Type", "application/json");
  //           res.status(500).json({
  //             error: "Email does not exist in system."
  //           });
  //         });
  //     }
  //   })
  // }
  // else {
  //   res.setHeader("Content-Type", "application/json");
  //   res.status(409).json({
  //     error:`Invalid email address.`
  //   });
})


module.exports = router;
