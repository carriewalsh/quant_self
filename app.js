const express = require("express");
var bodyParser = require('body-parser')
const app = express();
const environment = process.env.NODE_ENV || "development";
const configuration = require("./knexfile")[environment];
const database = require("knex")(configuration);

const cors = require('express-cors');
const path = require('path');


var indexRouter = require('./routes/index');
var foodsRouter = require('./routes/api/v1/foods');
var mealsRouter = require('./routes/api/v1/meals');

app.use(bodyParser.json())
app.use('/', indexRouter);
app.use('/api/v1/foods', foodsRouter);
app.use('/api/v1/meals', mealsRouter);

// app.engine('html')
app.use(express.static(path.join(__dirname + '/public')));

app.use(cors());
app.set('views', path.join(__dirname, 'views'));

var engines = require('consolidate');

app.set('views', __dirname + '/views');
app.engine('html', engines.mustache);
app.set('view engine', 'html');


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
