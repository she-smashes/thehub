/**
 * @author Uma Govindaraj
 * @description Action file to make the API call
 */

import axios from 'axios';

import { DEFAULT_EVENTS } from "../../constants/actions";
import { GET_EVENTS } from "../../constants/apiList";


/**
 * Invoke the getEventList API
 * @param {*the access token for the user who is logged in} accessToken 
 */
export const getEventList = (accessToken) => {
  console.log('getEventList = ', getEventList);
  const request = axios.get(GET_EVENTS + '?access_token=' + accessToken);

  return {
    type: DEFAULT_EVENTS,
    payload: request
  };

}
