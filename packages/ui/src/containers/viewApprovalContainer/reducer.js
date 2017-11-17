/**
 * @author Kriti Aggarwal
 * @description A reducer function that returns the initiative list
 * based on the action type passed to it
 * @param {Object} state
 * @param {Object} action
 */

import { DEFAULT_TASKS } from "../../constants/actions";
import { APPROVE_TASK } from "../../constants/actions";

export default function (state = [], action) {

    console.log('In', action.type)

    switch (action.type) {
        case DEFAULT_TASKS: {
            console.log('In', action.payload.data.pendingTasks);
            return action.payload.data.pendingTasks;
        }
        case APPROVE_TASK: {
            const finalState = [];
            state.map(item => {
                if (item.id !== action.payload.data.id) {                 
                    finalState.push(item);
                }
            });
            return finalState;
        }
        default:
            return state;

    }
}
