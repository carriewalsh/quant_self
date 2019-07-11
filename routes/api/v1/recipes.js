var app = require('../../../app');
var express = require('express');
var router = express.Router();
const environment = process.env.NODE_ENV || "development";
const configuration = require("../../../knexfile")[environment];
const database = require("knex")(configuration);
const pry = require('pryjs')
var request = require('request');
const urlMicroService = 'http://localhost:3001/api/v1/recipes?'


// function edamamRequest(error, response, body) {
//     if (error) {
//         console.log('error:', error); // Print the error if one occurred
//
//     } else if(response && body) {
//         console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//         // var json = JSON.stringify(body)
//         res.send( JSON.parse(body) ); // Print JSON response.
//     }
// };


router.get('/calories_search', async (req,res) => {
  var queryObject = {
      q: req.query.q,
      calories: req.query.calories
  }
  request({
      url: urlMicroService,
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

router.get('/ingredient_search', async (req,res) => {
  var queryObject = {
      q: req.query.q,
      ingr: req.query.ingr
  }
  request({
      url: urlMicroService,
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

router.get('/health_search', async (req,res) => {
  var queryObject = {
      q: req.query.q,
      health: req.query.health
  }
  request({
      url: urlMicroService,
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

router.get('/diet_search', async (req,res) => {
  var queryObject = {
      q: req.query.q,
      diet: req.query.diet
  }
  request({
      url: urlMicroService,
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

router.get('/food_search', function (req, res) {
    var queryObject = {
        q: req.query.q
    }
    request({
        url: urlMicroService,
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
