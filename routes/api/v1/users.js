var express = require('express');
var router = express.Router();
var User = require('../../../models/user');
var bcrypt = require('bcryptjs');
var validator = require('email-validator');
const pry = require('pryjs');

router.post("/", function(req,res,next) {
  var email = req.body.email
  var password = req.body.password
  var confirm = req.body.passwordConfirmation
  if (email)
  User.query().where('email', email)
  .then(result => {
    if (result) {
      res.setHeader("Content-Type", "application/json");
      res.status(409).json({
        error: `Email already exists in system.`
      });
    }
    else {
      if (confirm === "") {
        res.setHeader("Content-Type", "application/json");
        res.status(409).json({
          error: `Must provide password confirmation.`
        });
      }
      else if (!validator.validate(email)) {
        res.setHeader("Content-Type", "application/json");
        res.status(409).json({
          error:`Invalid email address.`
        });
      }
      else if (password.length < 8) {
        res.setHeader("Content-Type", "application/json");
        res.status(409).json({
          error: `Password must be 8 characters or more.`
        })
      }
      else if (password !== confirm) {
        res.setHeader("Content-Type", "application/json");
        res.status(409).json({
          error: `Passwords must match.`
        });
      }
      else {
        bcrypt.genSalt(10, function(err,salt) {
          bcrypt.hash(req.body.password, salt, async function(err,hash) {
            try
              {
                eval(pry.it)
              await User
                .query()
                .insert({ email: email, password: hash, api_key: Math.random().toString(36).substring(2,8) })
                res.setHeader("Content-Type", "application/json");
                res.status(201).send(`${email} has been created ${JSON.stringify(user)}`);
              }
            catch (error)
              {
              res.setHeader("Content-Type", "application/json");
              res.status(500).send({error});
              };
          })
        })
      };
    };
  });
});

module.exports = router;
