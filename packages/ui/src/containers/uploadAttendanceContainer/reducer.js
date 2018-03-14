/**
 * @author Thenmozhi Subramaniam
 * @description A reducer function that returns the event details
 * based on the action type passed to it
 * @param {Object} state
 * @param {Object} action
 */

import { GET_ATTENDANCEDETAILS, GET_EVENTDETAILSFORATTENDANCE, RESET_STORE } from "../../constants/actions";

export default function (state = [], action) {
    switch (action.type) {
        case GET_ATTENDANCEDETAILS: {
            return action.payload;
        }
        case GET_EVENTDETAILSFORATTENDANCE: {
            return action.payload;
        }
        case RESET_STORE:
            return [];
        default:
            return state;
    }
}
