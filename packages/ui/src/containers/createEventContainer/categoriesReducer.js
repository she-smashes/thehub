/**
 * @author Ragasudha Aradhyula
 * @description A reducer function that send the values to create a new initiative
 * based on the action type passed to it
 * @param {Object} state
 * @param {Object} action
 */

import { GET_CATEGORIES} from "../../constants/actions";

export default function (state = [], action) {
    switch (action.type) {
        case GET_CATEGORIES:
            return action.payload.data;        
        default:
            return state;

    }
}
