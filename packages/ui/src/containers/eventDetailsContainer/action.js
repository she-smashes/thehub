import { GET_EVENTDETAILS } from "../../constants/actions";
import { GET_EVENTDETAILURL } from "../../constants/apiList";
import { SWAGGER_SPEC_URL } from "../../constants/apiList";

import Swagger from 'swagger-client';

export const getEventDetails = (eventId, access_token) => {

  return function (dispatch) {
    Swagger(SWAGGER_SPEC_URL,
      {
        requestInterceptor: (req) => {
          req.headers['Authorization'] = access_token;
          return req;
        },
      })
      .then((client) => {
        client
          .apis
          .event
          .event_findById({ id: eventId })
          .then(resp => dispatch(getEventDet(resp)),
        )
      });
  }
}
  function getEventDet(resp) {
    return {
      type: 'GET_EVENTDETAILS',
      payload: resp
    };
  }
  