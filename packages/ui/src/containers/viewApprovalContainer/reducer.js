/**
 * @author Uma Govindaraj
 * @description A reducer function that returns the task list and approves the specified task.
 * @param {Object} state
 * @param {Object} action
 */

import { DEFAULT_TASKS, RESET_STORE } from "../../constants/actions";
import { APPROVE_TASK } from "../../constants/actions";

export default function (state = [], action) {

    switch (action.type) {
        case DEFAULT_TASKS: {
            return action.payload;
        }
        case APPROVE_TASK: {
            const finalState = [];
            state.map(item => {
                let responseItem =  action.payload;
                if (item.id !== responseItem.id) {                 
                    finalState.push(item);
                }
            });
            
            return finalState;
        }
        case RESET_STORE:
            return [];
        default:
            return state;

    }
}
