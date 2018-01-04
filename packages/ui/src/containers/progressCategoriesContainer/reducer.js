/**
 * @author Shalini Jha
 * @description A reducer function that returns the events list
 * based on the action type passed to it
 * @param {Object} state
 * @param {Object} action
 */

import { DEFAULT_PROGRESS_CATEGORIES, RESET_STORE } from "../../constants/actions";
export default function (state = [], action) {
    switch (action.type) {
        case DEFAULT_PROGRESS_CATEGORIES:
            return action.payload;
        case RESET_STORE:
            return [];
        default:
            return state;

    }
}
