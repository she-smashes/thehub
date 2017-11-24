/**
 * @author Kriti Aggarwal
 * @description A reducer function that returns the initiative list
 * based on the action type passed to it
 * @param {Object} state
 * @param {Object} action
 */

import { DEFAULT_INITIATIVES } from "../../constants/actions";

export default function (state = [], action) {
   
    switch (action.type) {
        case DEFAULT_INITIATIVES:
            return JSON.parse(action.payload.data);
        default:
            return state;

    }
}
