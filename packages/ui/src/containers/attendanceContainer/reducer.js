import { ATTENDANCE_INFO, RESET_STORE } from "../../constants/actions";
export default function (state = [], action) {
    switch (action.type) {
        case ATTENDANCE_INFO:
            return action.payload;
        case RESET_STORE:
            return [];
        default:
            return state;

    }
}
