const express = require("express");
const fetch = require('node-fetch');
const router = express.Router();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);
var Food = require('../models/food')
var Meal = require('../models/meal')
var User = require('../models/user')
var pry = require('pryjs');
var validator = require('email-validator');

async function login(req,res) {
  try {
    const email = req.body.email
    const passwordAttempt = req.body.password
    if (validator.validate(email)) {
      const user = await User.query().where(email, email)
      if (user) {
        // let passwordHash = user.password
        // let apiKey = result["dataValues"]["api_key"]
        // let verify = bcrypt.compare(passwordAttempt, passwordHash)
        if (passwordAttempt === user.password) {
          res.render('welcome.ejs', {
            name: user.name
          })
        }
        else {
          res.setHeader("Content-Type", "application/json");
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
      res.setHeader("Content-Type", "application/json");
      res.status(409).json({
        error:`Invalid email address.`
      });
    }
  } catch (error) {
    eval(pry.it)
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
