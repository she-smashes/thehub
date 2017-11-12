import axios from 'axios';

import { GET_EVENTDETAILS } from "../../constants/actions";
import { GET_EVENTDETAILURL } from "../../constants/apiList"
export const getEventDetails = (eventId, access_token) => {
  const request = axios.get(GET_EVENTDETAILURL + "/" + eventId + "?"+access_token);
  return {
    type: GET_EVENTDETAILS,
    payload: request
  };
}
