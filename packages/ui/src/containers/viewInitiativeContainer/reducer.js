/**
 * @author Kriti Aggarwal
 * @description A reducer function that returns the initiative list
 * based on the action type passed to it
 * @param {Object} state
 * @param {Object} action
 */

import { DEFAULT_INITIATIVES } from "../../constants/actions";
import { DEFAULT_EVENTS } from "../../constants/actions";

export default function (state = [], action) {

    console.log('In', action.type);
    
    switch (action.type) {
        case DEFAULT_INITIATIVES:
            return action.payload.data;
        case DEFAULT_EVENTS:
            return action.payload.data.events;
        default:
            return state;

    }
}
