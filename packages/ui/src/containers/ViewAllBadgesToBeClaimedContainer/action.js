
/**
 * @author Uma Govindaraj
 * @description Action file to make the API call
 */

import Swagger from 'swagger-client';

import { TO_BE_CLAIMED_BADGES, CLAIMED_BADGE } from "../../constants/actions";

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
    type: TO_BE_CLAIMED_BADGES,
    payload: badgesInfo.badges
  };
}


export const claimBadge = (userBadgeId, badgeId, userInfo) => {
  
    return function (dispatch) {
      return Swagger(process.env.REACT_APP_API_URI,
        {
          requestInterceptor: (req) => {
            req.headers['Authorization'] = userInfo.id;
            return req;
          },
        })
        .then((client) => {    
      
          let putBody = { "claimed": true };
          putBody = JSON.stringify(putBody);
  
          return client
            .apis
            .userBadge
            .userBadge_prototype_patchAttributes({ id: userBadgeId, data: putBody });

        });
    }
  }

  export const updateBadgeClaimedInfo = (badgeData) => {
    return {
      type: CLAIMED_BADGE,
      payload: badgeData
    };
  }





