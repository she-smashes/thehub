
/**
 * @author Uma Govindaraj
 * @description Action file to make the API call
 */

import Swagger from 'swagger-client';

import { TO_BE_CLAIMED_BADGES_LIST, CLAIMED_BADGE } from "../../constants/actions";

export const getBadgesToBeClaimedList = (access_token) => {

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
          .userBadge_listBadgesToBeClaimed();
      });
  }
}
export const updateBadgesToBeClaimedInfo = (badgesInfo) => {
  return {
    type: TO_BE_CLAIMED_BADGES_LIST,
    payload: badgesInfo.badges
  };
}


export const claimBadge = (badgeId, userInfo) => {
  
    return function (dispatch) {
      return Swagger(process.env.REACT_APP_API_URI,
        {
          requestInterceptor: (req) => {
            req.headers['Authorization'] = userInfo.id;
            return req;
          },
        })
        .then((client) => {    
          let postBody = {
            "badgeId": badgeId,
            "userId": userInfo.userId
          };
          postBody = JSON.stringify(postBody);     
            return client
              .apis
              .userBadge
              .userBadge_create({ data: postBody}); 
        });
    }
  }






