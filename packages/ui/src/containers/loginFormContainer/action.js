import Swagger from 'swagger-client';
import { AUTHORIZED_USER } from "../../constants/actions";
import { SWAGGER_SPEC_URL } from "../../constants/apiList";


/**
* Logs in the user
* @param {*the user data to login the user} userInfo
*/
export const getUserInfo = (userInfo) => {

  return function (dispatch) {
    return Swagger(SWAGGER_SPEC_URL,
      {
        requestInterceptor: (req) => {
          
          return req;
        },
      })
      .then((client) => {

        let loginBody = {
          "email": userInfo.email,
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
