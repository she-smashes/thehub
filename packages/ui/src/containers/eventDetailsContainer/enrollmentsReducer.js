import { GET_EVENTENROLLMENTDETAILS, RESET_STORE} from "../../constants/actions";

export default function (state = [], action) {

    switch (action.type) {
        case GET_EVENTENROLLMENTDETAILS: {
            return action.payload;
        }
        case RESET_STORE:
            return [];
        default:
            return state;

    }
}
