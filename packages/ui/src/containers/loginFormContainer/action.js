import Swagger from 'swagger-client';
import { AUTHORIZED_USER } from "../../constants/actions";
import { SWAGGER_SPEC_URL } from "../../constants/apiList";
/*
export const getUserInfo = (userInfo) => {
  const request = axios.post(LOGGIN_USER,
  {
      "email": userInfo.email,
      "password": userInfo.password
  });
  return {
    type: AUTHORIZED_USER,
    payload:request
  };
}*/

/**
* Logs in the user
* @param {*the user data to login the user} userInfo
*/
export const getUserInfo = (userInfo) => {

  return function (dispatch) {
    Swagger(SWAGGER_SPEC_URL,
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
        
        client
          .apis
          .user
          .user_login({credentials: loginBody, include: "user"})
          .then(resp => dispatch(getResponse(AUTHORIZED_USER, resp)),
        )

      });
  }

}






function getResponse(type, resp) {
  return {
    type: type,
    payload: resp
  };
}
