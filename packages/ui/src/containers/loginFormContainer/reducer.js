/**
 * @author Ragasudha Aradhyula
 * @description A reducer function that returns the user info confirmation
 * based on the action type passed to it
 * @param {Object} state
 * @param {Object} action
 */
import { AUTHORIZED_USER } from "../../constants/actions";
export default function (state = [], action) {
    switch (action.type) {
        case AUTHORIZED_USER:
            return action.payload;
        default:
            return state;

    }
}
