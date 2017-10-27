import axios from 'axios';

import { DEFAULT_EVENTS } from "../../constants/actions";
import { GET_EVENTS } from "../../constants/apiList"

export const getEventList = () => {
  console.log('Actions')
  const url = process.env.REACT_APP_API_PROFILE_URL;
  const request = axios.get(GET_EVENTS);
  console.log(request)
  return {
    type: DEFAULT_EVENTS,
    payload: request
  };
}