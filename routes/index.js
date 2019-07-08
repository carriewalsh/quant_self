var express = require('express');
var router = express.Router();
var $ = require('jquery')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/api/v1', function(req, res, next) {
  res.render('index');
});

module.exports = router;
