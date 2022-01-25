var express = require('express');
var router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const authenticate = require('../authenticate');



router.get('/', authenticate.verifyUser, (req, res) => {
  User.find()
  .then(data => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(data);       
  })
  .catch(err => next(err));
})



router.post('/signup', (req, res) => {
  User.register(
      new User({username: req.body.username, firstname: req.body.firstname, lastname: req.body.lastname,}),
      req.body.password,
      err => {
          if (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.json({err: err});
          } else {
              passport.authenticate('local')(req, res, () => {
                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.json({success: true, status: 'Registration Successful!'});
              });
          }
      }
  );
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  const token = authenticate.getToken({_id: req.user._id});
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true, token: token, status: 'You are successfully logged in!'});
});



module.exports = router; 


