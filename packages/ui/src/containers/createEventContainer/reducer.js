/**
 * @author Ragasudha Aradhyula
 * @description A reducer function that send the values to create a new initiative
 * based on the action type passed to it
 * @param {Object} state
 * @param {Object} action
 */

import { CREATE_AN_EVENT , GET_INITIATIVES, CONFIRM_USER, GET_CATEGORIES} from "../../constants/actions";

export default function (state = [], action) {
    switch (action.type) {
        case CREATE_AN_EVENT:
            return action.payload.data;
        case GET_CATEGORIES:
            return action.payload.data;
        case GET_INITIATIVES:
            return action.payload.data;
        case CONFIRM_USER:
            return action.payload;
        default:
            return state;

    }
}
