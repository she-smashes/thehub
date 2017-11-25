import { GET_EVENTDETAILS } from "../../constants/actions";
import { GET_EVENTDETAILURL } from "../../constants/apiList";
import { SWAGGER_SPEC_URL } from "../../constants/apiList";

import Swagger from 'swagger-client';

export const getEventDetails = (eventId, access_token) => {

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
          .event_findById({ id: eventId });
      });
  }
}
export const registerUserForEvent = (eventId, userId, access_token) => {

  return function (dispatch) {
    return Swagger(SWAGGER_SPEC_URL,
      {
        requestInterceptor: (req) => {
          req.headers['Authorization'] = access_token;
          return req;
        },
      })
      .then((client) => {

        let postBody = {
          "eventId": eventId,
          "userId": userId,
          "registeredOn": new Date(),
          "enrollmentType": "1"
        };
        postBody = JSON.stringify(postBody);

        return client
          .apis
          .event
          .event_prototype___create__enrollments({ id: eventId, data: postBody });

      });
  }
}

export const updateEventDetails = (eventDetailsInfo) => {
  return {
    type: 'GET_EVENTDETAILS',
    payload: eventDetailsInfo
  };
}
