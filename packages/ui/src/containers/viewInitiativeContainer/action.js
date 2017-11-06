import axios from 'axios';

import { DEFAULT_EVENTS, UPDATE_EVENT_LIST } from "../../constants/actions";
import { GET_EVENTS } from "../../constants/apiList";
import {initiativeList} from './data';

export const getEventList = () => {
  console.log('Actions', initiativeList)
  // const request = axios.get(GET_EVENTS);
  // console.log(request)
  return {
    type: DEFAULT_EVENTS,
    payload: {data:initiativeList}
  };
}

export const updateEventList = (data) => {
  return {
    type: UPDATE_EVENT_LIST,
    payload: data
  }
}