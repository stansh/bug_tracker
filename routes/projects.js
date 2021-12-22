
var express = require('express');
var router = express.Router();
const Project = require('../models/project'); 



router.get('/', (req, res, next) => {
     
    Project.find()
    //db.getCollection('projects').find({})
    //console.log(db)
    .then(data => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(data); 
          
      })
      .catch(err => next(err));
  })


 /*  router.get('/', (req, res, next)) => {
    
    .then(data => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(data); 
          
      })
      .catch(err => next(err));
 
    }) */

  module.exports = router;