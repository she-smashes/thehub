/**
 * @author Sandhya Salian
 * @description A reducer function that send the values to create a new initiative
 * based on the action type passed to it
 * @param {Object} state
 * @param {Object} action
 */

import { CREATE_AN_INITIATIVE } from "../../constants/actions"; 
export default function (state = [], action) {
    
    switch (action.type) {
        case CREATE_AN_INITIATIVE:{
            return JSON.parse(action.payload.data);}
        default:
            return state;
        
    }
}