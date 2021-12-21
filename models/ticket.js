const mongoose = require('mongoose');
const Schema = mongoose.Schema;



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

}, {
    timestamps: true
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;