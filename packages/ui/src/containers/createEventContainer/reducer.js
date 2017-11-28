/**
 * @author Ragasudha Aradhyula
 * @description A reducer function that send the values to create a new initiative
 * based on the action type passed to it
 * @param {Object} state
 * @param {Object} action
 */

import { CREATE_AN_EVENT, RESET_STORE } from "../../constants/actions";

export default function (state = [], action) {
    switch (action.type) {
        case CREATE_AN_EVENT:
            return action.payload.data;   
        case RESET_STORE:
            return []     
        default:
            return state;

    }
}
