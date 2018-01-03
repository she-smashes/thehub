
import { GET_INITIATIVEDETAILS, RESET_STORE } from "../../constants/actions";

export default function (state = [], action) {
    switch (action.type) {
        case GET_INITIATIVEDETAILS: {
            return action.payload;
        }
        case RESET_STORE:
            return [];
        default:
            return state;
    }
}
