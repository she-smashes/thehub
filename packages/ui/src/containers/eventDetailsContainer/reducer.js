/**
 * @author Thenmozhi Subramaniam
 * @description A reducer function that returns the event details
 * based on the action type passed to it
 * @param {Object} state
 * @param {Object} action
 */

import { GET_EVENTDETAILS } from "../../constants/actions";
import { REGISTER_USER_FOR_EVENT } from "../../constants/actions";

export default function (state = [], action) {
    switch (action.type) {
        case GET_EVENTDETAILS: {
           return action.payload;
        }
        case REGISTER_USER_FOR_EVENT: {
            return action.payload;
         }
        default:
            return state;
    }
}
