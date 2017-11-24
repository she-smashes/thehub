/**
 * @author Uma Govindaraj
 * @description A reducer function that returns the task list and approves the specified task.
 * @param {Object} state
 * @param {Object} action
 */

import { DEFAULT_TASKS } from "../../constants/actions";
import { APPROVE_TASK } from "../../constants/actions";

export default function (state = [], action) {

    switch (action.type) {
        case DEFAULT_TASKS: {
            return JSON.parse(action.payload.data).pendingTasks;
        }
        case APPROVE_TASK: {
            const finalState = [];
            state.map(item => {
                if (item.id !== JSON.parse(action.payload.data).id) {                 
                    finalState.push(item);
                }
            });
            
            return finalState;
        }
        default:
            return state;

    }
}
