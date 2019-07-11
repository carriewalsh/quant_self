var express = require('express');
var router = express.Router();
var Food = require('../../../models/food')
var Meal = require('../../../models/meal')
var foodsController = require('../../../controllers/api/v1/foods_controller.js');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);
var pry = require('pryjs');

const { Model } = require('objection');
Model.knex(database)

router.get('/', async (req,res) => {
  // const users = await database.select('apiKey').from('users')
  // const apis = []
  // users.forEach(user => {
    // apis.push(user['apiKey'])
  // })
  // if (apis.includes(req.body.apiKey)) {
    foodsController.index(req,res)
  // }
  // else {
    // res.status(401).json({
      // error: "Unauthorized"
    // })
  // }
})

router.get('/:id', async (req,res) => {
  // const users = await database.select('apiKey').from('users')
  // const apis = []
  // users.forEach(user => {
    // apis.push(user['apiKey'])
  // })
  // if (apis.includes(req.body.apiKey)) {
    foodsController.show(req,res)
  // }
  // else {
    // res.status(401).json({
      // error: "Unauthorized"
    // })
  // }
})

router.post('/', async (req,res) => {
  // const users = await database.select('apiKey').from('users')
  // const apis = []
  // users.forEach(user => {
    // apis.push(user['apiKey'])
  // })
  // if (apis.includes(req.body.apiKey)) {
    foodsController.create(req,res)
  // }
  // else {
    // res.status(401).json({
      // error: "Unauthorized"
    // })
  // }
})

router.patch('/:id', async (req,res) => {
  // const users = await database.select('apiKey').from('users')
  // const apis = []
  // users.forEach(user => {
    // apis.push(user['apiKey'])
  // })
  // if (apis.includes(req.body.apiKey)) {
    foodsController.update(req,res)
  // }
  // else {
    // res.status(401).json({
      // error: "Unauthorized"
    // })
  // }
})

router.delete('/:id', async (req,res) => {
  // const users = await database.select('apiKey').from('users')
  // const apis = []
  // users.forEach(user => {
    // apis.push(user['apiKey'])
  // })
  // if (apis.includes(req.body.apiKey)) {
    foodsController.destroy(req,res)
  // }
  // else {
    // res.status(401).json({
      // error: "Unauthorized"
    // })
  // }
})

module.exports = router;
