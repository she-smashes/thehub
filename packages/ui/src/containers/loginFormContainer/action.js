import axios from 'axios';
import { AUTHORIZED_USER } from "../../constants/actions";
//import myData from '../../constants/userdetails'
import { LOGGIN_USER } from "../../constants/apiList"
import { GET_EVENTS } from "../../constants/apiList"
import LoginWidget from '../../components/login';

export const getUserInfo = (userInfo) => {
  //const request = JSON.stringify(myData);
  console.log(userInfo);

  const request = axios.post(LOGGIN_USER, 
    {
      "email":"customer1@example.com",
      "password":"customer1"
      }  )
  // {
  //     "email": userInfo.username,
  //     "password": userInfo.password
  // });
  console.log(request)
  return {
    type: AUTHORIZED_USER,
    payload:request
  };
}
