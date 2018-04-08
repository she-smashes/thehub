import axios from 'axios';

import Swagger from 'swagger-client';
import { AUTHORIZED_USER, AUTH_USER_DETAILS } from "../../constants/actions";

export const getUserAuthDetails = (token, authURL) => {
  //const request = JSON.stringify(myData);

  const request = axios.get(authURL);
  return {
    type: AUTH_USER_DETAILS,
    payload:request
  };
}
/**
* Logs in the user
* @param {*the user data to login the user} userInfo
*/
export const loginUser  = (userInfo) => {

  return function (dispatch) {
    return Swagger(process.env.REACT_APP_API_URI,
      {
        requestInterceptor: (req) => {

          return req;
        },
      })
      .then((client) => {

        let loginBody = {
          "username": userInfo.username,
          "password": userInfo.password
      };
      loginBody = JSON.stringify(loginBody);

        return client
          .apis
          .user
          .user_login({credentials: loginBody, include: "user"});
      });
  }

}
/**
 * @name updateUserInfo
 * @desc Updates the user info to reducer
 * @param {*} type
 * @param {*} resp
 */
export const updateUserInfo = (userInfo) => {
  return {
    type: AUTHORIZED_USER,
    payload: userInfo
  };
}
