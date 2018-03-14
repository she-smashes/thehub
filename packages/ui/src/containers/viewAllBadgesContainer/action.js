
/**
 * @author Uma Govindaraj
 * @description Action file to make the API call
 */

import Swagger from 'swagger-client';

import { ALL_BADGES } from "../../constants/actions";

export const getAllBadgesList = (access_token) => {

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
          .userBadge
          .userBadge_listSystemBadges();
      });
  }
}
export const updateAllBadgesInfo = (badgesInfo) => {
  return {
    type: ALL_BADGES,
    payload: badgesInfo.badges
  };
}





