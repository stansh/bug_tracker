

import * as actions from "./actions"

export const ticketsReducer = (state = {
    isLoading:true,
    errMess:null,
    tickets: []
}, action) => {
    switch (action.type) {
        case actions.LOAD_TICKETS:
            return {...state, isLoading: false, errMess: null, tickets: action.payload};
        case actions.LOADING_TICKETS:
            return {...state, isLoading: true, errMess: null, tickets: []};
        case actions.LOAD_TICKETS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, tickets: []};
        case actions.ADD_TICKET:
            let newTicket = action.payload.res;
            newTicket.assignee = action.payload.assignee;
            newTicket.project = action.payload.project;
            newTicket.createdBy = action.payload.userObj;
            return {...state, isLoading: true, errMess: null, tickets: state.tickets.concat(newTicket)};
        case actions.REMOVE_TICKET:
            const updatedTickets = state.tickets.filter(tic => tic._id !== action.payload._id)
            return {...state, isLoading: true, errMess: null, tickets: updatedTickets};
        case actions.UPDATE_TICKET:
             return {...state,
                tickets: state.tickets.map(tic=> {
                    if(tic._id === action.payload._id) {
                        tic.assignee = action.payload.assignee;
                        tic.comments = action.payload.comments;
                        tic.priority = action.payload.priority
                    }
                    return tic
                })
            };
        default:
            return state;
    }
};