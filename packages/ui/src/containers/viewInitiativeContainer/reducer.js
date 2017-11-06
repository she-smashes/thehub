/**
 * @author Kriti Aggarwal
 * @description A reducer function that returns the initiative list
 * based on the action type passed to it
 * @param {Object} state
 * @param {Object} action
 */

import { DEFAULT_EVENTS, UPDATE_EVENT_LIST } from "../../constants/actions"; 
export default function (state = [], action) {
    console.log('In', action.type)
    switch (action.type) {
        case DEFAULT_EVENTS:
            return action.payload.data;
        case UPDATE_EVENT_LIST:
            return action.payload
        default:
            return state;
        
    }
}