
/**
 * @author Uma Govindaraj
 * @description Action file to make the API call
 */


import { DEFAULT_INITIATIVES } from "../../constants/actions";

import Swagger from 'swagger-client';

export const getInitiativeList = (access_token) => {

  return function (dispatch) {
    return Swagger(process.env.REACT_APP_API_URI,
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
          .initiative
          .initiative_find({filter: filterQuery});
      });
  }
}
export const updateViewInitiativeInfo = (viewInitiativeInfo) => {
    return {
      type: DEFAULT_INITIATIVES,
      payload: viewInitiativeInfo
    };
  }
  
