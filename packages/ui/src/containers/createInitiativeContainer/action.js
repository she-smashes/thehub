import { CREATE_AN_INITIATIVE } from "../../constants/actions";
import { SWAGGER_SPEC_URL } from "../../constants/apiList";

import Swagger from 'swagger-client';

export const sendInitiativeDetails = (initiativeDetails, access_token) => {
  return function (dispatch) {
    Swagger(SWAGGER_SPEC_URL,
      {
        requestInterceptor: (req) => {
          req.headers['Authorization'] = access_token;
          return req;
        },
      })
      .then((client) => {

        let postBody = {
          "title": initiativeDetails.title,
          "description": initiativeDetails.description,
          "lead": initiativeDetails.lead
        };
        postBody = JSON.stringify(postBody)
        
        client
          .apis
          .initiative
          .initiative_create({ data: postBody })
          .then(resp => dispatch(getResponse(resp)),
        )
      });
  }
}
  function getResponse(resp) {
    return {
      type: CREATE_AN_INITIATIVE,
      payload: resp
    };
  }
  