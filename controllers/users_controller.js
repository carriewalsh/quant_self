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
var session = require('../models/POJOs/session')
var uuid = require('uuid-apikey')

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
          res.redirect('/users/welcome')
        }
        else {
          res.status(401).render('login.ejs', {
            flash: 'Email and password do not match.'
          })
        }
      }
      else {
        res.status(401).render('login.ejs', {
          flash: 'Email not registered in database.'
        })
      }
    }
    else {
      res.status(403).render('login.ejs', {
        flash: 'Invalid email address.'
      })
    }
  } catch (error) {
    console.log(error)
    res.status(404).redirect('404.html')
  }
}

async function register(req,res) {
  try {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const passwordConfirmation = req.body.passwordConfirmation
    if (validator.validate(email)) {
      exists = await database('users').where('email',email)
      if (exists[0]) {
        res.status(403).render('register.ejs', {
          flash: 'Email already exists in database.'
        })
      }
      else {
        if (password === passwordConfirmation) {
          const apiKey = uuid.create()['apiKey']
          user = await database('users').insert({
            name: name,
            email: email,
            password: password,
            apiKey: apiKey
          })
          session.setKey(apiKey)
          res.redirect('/users/welcome').locals({
            name: name
          })
        }
        else {
          res.status(403).render('register.ejs', {
            flash: 'Passwords must match.'
          })
        }
      }
    }
    else {
      res.status(403).render('register.ejs', {
        flash: 'Invalid email address.'
      })
    }
  }
  catch (error) {
    console.log(error)
    res.redirect('404.html')
  }
}

module.exports = {
  login: login,
  register: register
}
