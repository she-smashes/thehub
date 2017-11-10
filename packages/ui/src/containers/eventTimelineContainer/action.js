import axios from 'axios';

import { DEFAULT_EVENTS, UPDATE_EVENT_LIST } from "../../constants/actions";
import { GET_EVENTS } from "../../constants/apiList";
import {eventList} from './data';

export const getEventList = (accessToken) => {
  console.log('Actions', eventList)
  const request = axios.get(GET_EVENTS+'?access_token='+accessToken);
  console.log(request)
  return {
    type: DEFAULT_EVENTS,
    payload: request
  };
}

export const updateEventList = (data) => {
  return {
    type: UPDATE_EVENT_LIST,
    payload: data
  }
}