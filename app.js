const express = require("express");
var bodyParser = require('body-parser')
const app = express();
var pry = require('pryjs');
const environment = process.env.NODE_ENV || "development";
const configuration = require("./knexfile")[environment];
// eval(pry.it)
// const database = require("knex")(configuration);

const cors = require('express-cors');
const path = require('path');


const indexRouter = require('./routes/index');
const foodsRouter = require('./routes/api/v1/foods');
const mealsRouter = require('./routes/api/v1/meals');
const foodMealsRouter = require('./routes/api/v1/food_meals');
const recipesRouter = require('./routes/api/v1/recipes');
var usersRouter = require('./routes/users')

app.use(express.urlencoded())
app.use(bodyParser.json())
app.use('/', indexRouter);
app.use('/api/v1/meals/:meal_id/foods', foodMealsRouter);
app.use('/api/v1/foods', foodsRouter);
app.use('/api/v1/meals', mealsRouter);
app.use('/users', usersRouter);
app.use('/api/v1/recipes', recipesRouter);

// app.engine('html')
app.use(express.static(path.join(__dirname + '/public')));

app.use(cors());
app.set('views', path.join(__dirname, 'views'));

var engines = require('consolidate');

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/my_foods', function(req, res, next) {
  res.send("message")
});


// app.get('/api/v1/foods', (req,res) => {
//   database('foods').select()
//     .then(data => {
//       console.log(data)
//     })
//     .catch(error => {
//       console.log(error)
//     })
// })



module.exports = app;
