var express = require('express');
var router = express.Router();
var User = require('../../../models/user');
var bcrypt = require('bcryptjs');
var validator = require('email-validator');

router.post('', function(req,res,next) {
  var email = req.body.email
  var passwordAttempt = req.body.password
  if (validator.validate(email)) {
    User.query().where('email', email)
    .then(result => {
      if (result) {
        let passwordHash = result["dataValues"]["password"]
        let apiKey = result["dataValues"]["api_key"]
        let verify = bcrypt.compare(passwordAttempt, passwordHash)
        .then(comparison => {
          if (comparison) {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json({
              api_key: apiKey
            });
          }
          else {
            res.setHeader("Content-Type", "application/json");
            res.status(404).json({
              error: "Email and password do not match."
            });
          }
        })
      }
    }).catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).json({
        error: "Email does not exist in system."
      });
    });
  }
  else {
    res.setHeader("Content-Type", "application/json");
    res.status(409).json({
      error:`Invalid email address.`
    });
  }
});

module.exports = router;
