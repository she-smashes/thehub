import axios from 'axios';
import { AUTHORIZED_USER } from "../../constants/actions";
import { LOGGIN_USER } from "../../constants/apiList";

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
}
