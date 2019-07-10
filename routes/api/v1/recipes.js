var app = require('../../../app');
var express = require('express');
var router = express.Router();
const environment = process.env.NODE_ENV || "development";
const configuration = require("../../../knexfile")[environment];
const database = require("knex")(configuration);
const pry = require('pryjs')
var request = require('request');

router.get('/calories_search', async (req,res) => {
  mealsController.index(req,res)
})

router.get('/ingredient_search', async (req,res) => {
  mealsController.index(req,res)
})


router.get('/food_search', function (req, res) {
    var urlMicroService = 'http://localhost:3001/api/v1/recipes?'
    var queryObject = {
        q: req.query.q,
        diet: req.query.diet,
        calories: req.query.calories,
        health: req.query.health,
        ingr: req.query.ingr
    }
    request({
        url:urlMicroService,
        qs: queryObject
    }, function (error, response, body) {
        if (error) {
            console.log('error:', error); // Print the error if one occurred

        } else if(response && body) {
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            // var json = JSON.stringify(body)
            res.send( JSON.parse(body) ); // Print JSON response.
        }
    })
})






module.exports = router;
