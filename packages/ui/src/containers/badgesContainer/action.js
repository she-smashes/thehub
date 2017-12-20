
/**
 * @author Uma Govindaraj
 * @description Action file to make the API call
 */

import Swagger from 'swagger-client';

import { DEFAULT_BADGES } from "../../constants/actions";

export const getBadgesList = (access_token) => {

  return function (dispatch) {
    return Swagger(process.env.REACT_APP_API_URI,
      {
        requestInterceptor: (req) => {
          req.headers['Authorization'] = access_token;
          return req;
        },
      })
      .then((client) => {
console.log('aaaaaaaaaaaa');
        return client
          .apis
          .userBadge
          .userBadge_listUserBadges();
      });
  }
}
export const updateBadgesInfo = (badgesInfo) => {
  return {
    type: DEFAULT_BADGES,
    payload: badgesInfo.badges
  };
}





