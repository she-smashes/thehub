import { GET_INITIATIVEDETAILS } from "../../constants/actions";

import Swagger from 'swagger-client';

export const getInitiativeDetails = (initiativeId, userInfo) => {
  return function (dispatch) {
    return Swagger(process.env.REACT_APP_API_URI,
      {
        requestInterceptor: (req) => {
          req.headers['Authorization'] = userInfo.id;
          return req;
        },
      })
      .then((client) => {

        return client
          .apis
          .initiative
          .initiative_findById({ id: initiativeId});
      });
  }
}

export const updateInitiativeDetails = (userInfo, initiativeDetailsInfo) => {
  return {
    type: GET_INITIATIVEDETAILS,
    payload: initiativeDetailsInfo
  };
}


