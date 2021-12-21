
var express = require('express');
var router = express.Router();
const Ticket = require('../models/ticket'); 



router.get('/', (req, res, next) => {
    Ticket.find()
    .populate('assignee project')
  
   
    .then(data => {
        res.statusCode = 200;
        
        res.setHeader('Content-Type', 'application/json');
        res.json(data); 
          
      })
      .catch(err => next(err));
  })


  .post( '/', (req, res, next) => {
   
    Ticket.create(req.body)
    
    .then(tic => {
        if(tic.description.length === 0){
          err = new Error(`Campsite not found`);
          err.status = 404;
          return next(err);
        }
        console.log('new ticket: ', tic);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(tic);
    })
    .catch(err => next(err));
})

  module.exports = router;