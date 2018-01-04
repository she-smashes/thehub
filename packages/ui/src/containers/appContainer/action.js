import Swagger from 'swagger-client';
import { UPDATE_COUNT } from "../../constants/actions";

export const verifyUser = (username, userInfo) => {
  return function (dispatch) {
    return Swagger(process.env.REACT_APP_API_URI,
      {
        requestInterceptor: (req) => {
          req.headers['Authorization'] = userInfo.id;
          return req;
        },
      })
      .then((client) => {

        let filterQuery = {"where":{"username":username}};
        filterQuery = JSON.stringify(filterQuery)

        return client
          .apis
          .user
          .user_find({ filter: filterQuery });

      });
  }
}

export const verifyUsers = (usernames, userInfo) => {
  return function (dispatch) {
    return Swagger(process.env.REACT_APP_API_URI,
      {
        requestInterceptor: (req) => {
          req.headers['Authorization'] = userInfo.id;
          return req;
        },
      })
      .then((client) => {
        console.log(usernames);
        let filterQuery =  {"where":{"username": {"inq": usernames}}}
        filterQuery = JSON.stringify(filterQuery)

        return client
          .apis
          .user
          .user_find({ filter: filterQuery });
      });
  }
}
/**
* Logs in the user
* @param {*the user data to login the user} userInfo
*/
export const getUserInfo = (userInfo) => {

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
          .user
          .user_getNotificationCount();
      });
  }

}
/**
 * @name updateNotificationCount
 * @desc Updates the user info to reducer
 * @param {*} type
 * @param {*} resp
 */
export const updateNotificationCount = (userInfo) => {
  return {
    type: UPDATE_COUNT,
    payload: userInfo
  };
}
