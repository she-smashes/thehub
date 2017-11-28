/**
 * @author Ragasudha Aradhyula
 * @description A reducer function that returns the user info confirmation
 * based on the action type passed to it
 * @param {Object} state
 * @param {Object} action
 */
import { AUTHORIZED_USER, RESET_STORE } from "../../constants/actions";
export default function (state = [], action) {
    switch (action.type) {
        case AUTHORIZED_USER:
            return action.payload;
        case RESET_STORE:
            return [];
        default:
            return state;

    }
}
