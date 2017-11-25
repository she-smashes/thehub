/**
 * @author Uma Govindaraj
 * @description A reducer function that returns the event list and approves the specified event.
 * @param {Object} state
 * @param {Object} action
 */

import { VIEW_EVENTS } from "../../constants/actions";


export default function (state = [], action) {

    switch (action.type) {
        case VIEW_EVENTS: 
            return action.payload;
        default:
            return state;
    }
}
