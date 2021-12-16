
var express = require('express');
var router = express.Router();
const Project = require('../models/project'); 



router.get('/', (req, res, next) => {
    Project.find()
    .then(products => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(products); 
          
      })
      .catch(err => next(err));
  })

  module.exports = router;