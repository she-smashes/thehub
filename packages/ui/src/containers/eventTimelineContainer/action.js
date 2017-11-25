
/**
 * @author Uma Govindaraj
 * @description Action file to make the API call
 */


import axios from 'axios';
import Swagger from 'swagger-client';

import { DEFAULT_EVENTS } from "../../constants/actions";

import { SWAGGER_SPEC_URL } from "../../constants/apiList";


export const getEventList = (access_token) => {

  return function (dispatch) {
    return Swagger(SWAGGER_SPEC_URL,
      {
        requestInterceptor: (req) => {
          req.headers['Authorization'] = access_token;
          return req;
        },
      })
      .then((client) => {

        return client
          .apis
          .event
          .event_listEvents();
      });
  }
}
export const updateEventTimelineInfo = (eventDetailsInfo) => {
  return {
    type: DEFAULT_EVENTS,
    payload: eventDetailsInfo.events
  };
}





