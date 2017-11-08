/**
 * @author Thenmozhi Subramaniam
 * @description A reducer function that returns the events list
 * based on the action type passed to it
 * @param {Object} state
 * @param {Object} action
 */

import { DEFAULT_EVENT } from "../../constants/actions";
export default function (state = [], action) {
    console.log('In', action.type)
    switch (action.type) {
        case DEFAULT_EVENT:
            return action.payload.data;
        default:
            return state;
    }
}
