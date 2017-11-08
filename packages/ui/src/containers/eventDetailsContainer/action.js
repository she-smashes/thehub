import axios from 'axios';

import { GET_EVENTDETAILS } from "../../constants/actions";
import { GET_EVENTS } from "../../constants/apiList"
export const getEventDetails = (eventId, access_token) => {
  console.log('Actions')
  const request = axios.get(GET_EVENTS + "/" + eventId + "?"+access_token);
  console.log(request)
  return {
    type: GET_EVENTDETAILS,
    payload: request
  };
}
