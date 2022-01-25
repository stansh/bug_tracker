
var express = require('express');
var router = express.Router();
const Ticket = require('../models/ticket'); 


const authenticate = require('../authenticate');

router.get('/', authenticate.verifyUser, (req, res, next) => {
    Ticket.find()
    .populate('assignee project createdBy')
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
        err = new Error(`Issue description required`);
        err.status = 404;
        return next(err);
      }
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(tic);
      console.log(tic)
      
      
  })
  .catch(err => next(err));
})





 //update ticket
.post( '/:ticketId',(req, res, next) => {
  console.log(req.body.commentText)
  Ticket.findByIdAndUpdate(req.params.ticketId)
  .populate('assignee project')
  .then(tic => {
    if(req.body.commentText.length === 0) {
      tic.assignee = req.body.assignee
      tic.priority = req.body.priority
    
    } else {
      tic.comments.push(req.body);
      tic.assignee = req.body.assignee;
      tic.priority = req.body.priority;
    }
    tic.save()
    .then(tic => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(tic);
        console.log(tic)
        
        
    })
    .catch(err => next(err));

  })
  .catch(err => next(err));
})

 //delete ticket

router.delete('/:ticketId', (req, res, next) => {
  Ticket.findByIdAndDelete(req.params.ticketId)
  .populate('assignee project')
  .then(deleted => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(deleted);
      
      
        
    })
  .catch(err => next(err));
  
})

module.exports = router;