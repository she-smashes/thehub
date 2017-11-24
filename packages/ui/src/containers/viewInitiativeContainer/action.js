
/**
 * @author Uma Govindaraj
 * @description Action file to make the API call
 */


import { DEFAULT_INITIATIVES } from "../../constants/actions";
import { SWAGGER_SPEC_URL } from "../../constants/apiList";

import Swagger from 'swagger-client';

export const getInitiativeList = (access_token) => {

  return function (dispatch) {
    Swagger(SWAGGER_SPEC_URL,
      {
        requestInterceptor: (req) => {
          req.headers['Authorization'] = access_token;
          return req;
        },
      })
      .then((client) => {
        let filterQuery = {"where":{"status":"approved"}};
        filterQuery = JSON.stringify(filterQuery)

        client
          .apis
          .initiative
          .initiative_find({filter: filterQuery})
          .then(resp => dispatch(getResponse(resp)),
        )
      });
  }
}
  function getResponse(resp) {
    return {
      type: DEFAULT_INITIATIVES,
      payload: resp
    };
  }
  
