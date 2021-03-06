const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const commentSchema = new Schema({ 
    
    commentText: {
        type: String,
        required: true
    },
    commentator: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }

   /*  ticket: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Ticket' 
    }, */

}, {
    timestamps: true
});


const ticketSchema = new Schema({

    assignee: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },

    project:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Project' 

    },

    description: {
        type: String,
        required: true
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },

    priority: {
        type: String,
        required: true
    },

    comments: [commentSchema]

}, {
    timestamps: true
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;