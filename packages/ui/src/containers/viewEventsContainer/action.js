/**
 * @author Uma Govindaraj
 * @description Action file to make the API call
 */

import { VIEW_EVENTS } from "../../constants/actions";
import { SWAGGER_SPEC_URL } from "../../constants/apiList";

import Swagger from 'swagger-client';

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
        let filterQuery = {"where":{"status":"approved"}};
        filterQuery = JSON.stringify(filterQuery)
        
        return client
          .apis
          .event
          .event_find({filter: filterQuery});
      });
  }
}
export const updateViewEventsInfo = (vewEventsInfo) => {
    return {
      type: VIEW_EVENTS,
      payload: vewEventsInfo
    };
  }
  
