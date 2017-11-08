/**
 * @author Thenmozhi Subramaniam
 * @description A reducer function that returns the event details
 * based on the action type passed to it
 * @param {Object} state
 * @param {Object} action
 */

import { GET_EVENTDETAILS } from "../../constants/actions";
export default function (state = [], action) {
    console.log('In', action.type)
    switch (action.type) {
        case GET_EVENTDETAILS:
            return action.payload.data;
        default:
            return state;
    }
}
