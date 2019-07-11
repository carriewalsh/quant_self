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

router.get('/my_meals/:meal_id/foods', (req,res) => {
  if (session.apiKey) {
    usersController.my_meal(req,res)
  }
  else {
    eval(pry.id)
    res.status(404).redirect('404.html')
  }
  });

router.get('/404.html', (req,res) => {
  res.status(404).render('404.html')
})

router.get('/register', (req,res) => {
  session.deleteKey();
  res.render('register.ejs')
})

router.post('/', (req,res) => {
  usersController.register(req,res)
})

router.get('/', (req,res) => {
  res.redirect('/users/login')
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

router.get('/foods', (req,res) => {
  if (session.apiKey) {
    usersController.foods(req,res);
  }
  else {
    res.status(404).redirect('404.html')
  }
  })

router.get('/my_meals', (req,res) => {
  if (session.apiKey) {
    usersController.my_meals(req,res)
  }
  else {
    eval(pry.id)
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


module.exports = router;
