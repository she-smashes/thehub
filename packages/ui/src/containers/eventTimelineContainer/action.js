
/**
 * @author Uma Govindaraj
 * @description Action file to make the API call
 */

import Swagger from 'swagger-client';

import { DEFAULT_EVENTS } from "../../constants/actions";

export const getEventList = (access_token) => {

  return function (dispatch) {
    return Swagger(process.env.REACT_APP_API_URI,
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





