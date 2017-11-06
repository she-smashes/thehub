import axios from 'axios';
import { AUTHORIZED_USER } from "../../constants/actions";
//import myData from '../../constants/userdetails'
import { LOGGIN_USER } from "../../constants/apiList"
import { GET_EVENTS } from "../../constants/apiList"
import LoginWidget from '../../components/login';

export const getUserInfo = () => {

  const url = process.env.REACT_APP_API_PROFILE_URL;
  //const request = JSON.stringify(myData);

  const request = axios.get(LOGGIN_USER, {
    params: {
      "username": this.state.user.username,
      "password": this.state.user.password
    }
  });
  console.log(JSON.stringify(request)+"request");
  return {
    type: AUTHORIZED_USER,
    payload: request
  };
}
