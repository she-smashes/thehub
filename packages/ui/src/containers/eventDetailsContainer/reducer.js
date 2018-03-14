/**
 * @author Thenmozhi Subramaniam
 * @description A reducer function that returns the event details
 * based on the action type passed to it
 * @param {Object} state
 * @param {Object} action
 */

import { GET_EVENTDETAILS, RESET_STORE } from "../../constants/actions";
import { REGISTER_USER_FOR_EVENT } from "../../constants/actions";
import { GET_ENROLLMENTDETAILS, UPDATE_ENROLLMENTDETAILS } from "../../constants/actions";
export default function (state = [], action) {
    switch (action.type) {
        case GET_EVENTDETAILS: {
            return action.payload;
        }
        case REGISTER_USER_FOR_EVENT: {
            return action.payload;
        }
        case GET_ENROLLMENTDETAILS: {
            let evDet = {};
            action.payload.map(eventDetail => {
                if (eventDetail.userId === state.userInfo.userId) {
                    evDet = eventDetail;
                }
            });

            return evDet;
        }
        case UPDATE_ENROLLMENTDETAILS: {
            return action.payload;
        }
        case RESET_STORE:
            return [];
        default:
            return state;
    }
}
