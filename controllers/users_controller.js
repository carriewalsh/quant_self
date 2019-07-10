const express = require("express");
const fetch = require('node-fetch');
const router = express.Router();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);
var Food = require('../models/food')
var Meal = require('../models/meal')
// var User = require('../models/user')
var pry = require('pryjs');
var validator = require('email-validator');
var Session = require('../models/POJOs/session')
const session = new Session();

async function login(req,res) {
  try {
    const email = req.body.email
    const passwordAttempt = req.body.password
    if (validator.validate(email)) {
      const user = await database('users').where('email', email)
      if (user[0]) {
        // let passwordHash = user.password
        // let apiKey = user.apiKey
        // let verify = bcrypt.compare(passwordAttempt, passwordHash)
        if (passwordAttempt === user[0].password) {
          session.setKey(user[0].apiKey)
          eval(pry.it)
          res.render('welcome.ejs', {
            name: user[0].name
          })
        }
        else {
          res.status(404).json({
            error: "Email and password do not match."
          });
        }
      }
      res.status(404).json({
        error: "Email not registered in database"
      })
    }
    else {
      res.status(409).json({
        error:`Invalid email address.`
      });
    }
  } catch (error) {
    console.log(error)
    res.status(404).json({error})
  }
}

async function register(req,res) {

}

module.exports = {
  login: login,
  register: register
}
