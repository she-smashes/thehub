/**
 * @author Uma Govindaraj
 * @description A reducer function that returns the event list and approves the specified event.
 * @param {Object} state
 * @param {Object} action
 */

import { DEFAULT_EVENTS } from "../../constants/actions";


export default function (state = [], action) {
console.log('In = ', action.type);
    switch (action.type) {
        case DEFAULT_EVENTS: {
            return action.payload.data.events;
        }
        default:
            return state;

    }
}
