const express = require("express");
var bodyParser = require('body-parser')
const app = express();
const environment = process.env.NODE_ENV || "development";
const configuration = require("./knexfile")[environment];
const database = require("knex")(configuration);


var indexRouter = require('./routes/index');
var foodsRouter = require('./routes/api/v1/foods');
var mealsRouter = require('./routes/api/v1/meals');
var usersRouter = require('./routes/api/v1/users');

app.use(bodyParser.json())
app.use('/', indexRouter);
app.use('/api/v1/foods', foodsRouter);
app.use('/api/v1/meals', mealsRouter);
app.use('/api/v1/users', usersRouter);

module.exports = app;
