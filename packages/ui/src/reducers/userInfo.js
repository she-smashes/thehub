/**
 * @author Shalini Jha
 * @description A reducer function that return the userInfo
 * based on the action type passed to it
 * @param {Object} state
 * @param {Object} action
 */

export default function (state = {userName: "Shalini"}, action) {
    switch (action.type) {
	case "persist/REHYDRATE": {
            return { ...state, ...action.payload }
          }
        case 'UPDATE_USER_INFO':
            return action.payload;
        case 'RESET_TO_DEFAULT':
            return {userName: "Shalini"};
        default:
            return state;
        
    }
}