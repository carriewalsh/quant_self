var express = require('express');
var router = express.Router();
var fetch = require('node-fetch')
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);
var Food = require('../models/food.js')
var Meal = require('../models/meal.js')
// var User = require('../models/user.js')
var usersController = require('../controllers/users_controller')

const pry = require('pryjs')
var validator = require('email-validator');

var session = require('../models/POJOs/session')

router.get('/404.html', (req,res) => {
  res.status(404).render('404.html')
})

router.get('/my_foods', (req,res) => {
  if (session.apiKey) {
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
  }
  else {
    res.status(404).redirect('404.html')
  }
  })



router.get('/my_meals', (req,res) => {
  if (session.apiKey) {
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
  }
  else {
    res.status(404).redirect('404.html')
  }
  });


router.get('/my_meals/:id', (req,res) => {
  if (session.apKey) {
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
  }
  else {
    res.status(404).redirect('404.html')
  }
});

router.get('/recipe_search', (req,res) => {
  res.render('recipe_search.ejs')
})

router.post('/recipe_search', (req,res) => {
  // fetch call to microservice
})

router.get('/recipes', (req,res) => {
  // show results from microservice
})

router.get('/register', (req,res) => {
  session.deleteKey();
  res.render('register.ejs')
})

router.post('/register', (req,res) => {
  usersController.register(req,res)
})

router.get('/login', (req,res) => {
  session.deleteKey();
  res.render('login.ejs')
})

router.post('/sessions', (req,res) => {
  usersController.login(req,res)
})

router.get('/logout', (req,res) => {
  session.deleteKey();
  res.render('login.ejs', {
    flash: "Successfully logged out."
  })
})

router.get('/account', async (req,res) => {
  if (session.apiKey) {
    user = await database('users').where('apiKey', session.apiKey)
    res.render('account.ejs', {
      name: user[0].name,
      email: user[0].email,
      apiKey: user[0].apiKey
    })
  }
})

router.get('/welcome', async (req,res) => {
  if (session.apiKey) {
    user = await database('users').where('apiKey', session.apiKey)
    res.render('welcome.ejs', {
      name: user[0].name
    })
  }
  else {
    res.status(404).redirect('404.html')
  }
})


module.exports = router;
