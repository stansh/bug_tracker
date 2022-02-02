
var express = require('express');
var router = express.Router();
const Project = require('../models/project'); 
const authenticate = require('../authenticate');


router.get('/', authenticate.verifyUser,  (req, res, next) => {  
    Project.find()
    .then(data => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(data); 
          
      })
      .catch(err => next(err));
  })




module.exports = router;