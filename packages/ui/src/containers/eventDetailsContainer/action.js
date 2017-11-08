import axios from 'axios';

import { DEFAULT_EVENT } from "../../constants/actions";
import { GET_EVENTDETAILS } from "../../constants/apiList"

export const getEventDetails = (eventId) => {
  console.log('Actions')
//  const request = axios.get(GET_EVENTDETAILS + eventId);
  //console.log(request)
  return {
    type: GET_EVENTDETAILS,
    payload: {'event' :'name','eventStart':'23-2-2018'}//request
  };
}
