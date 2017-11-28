import axios from 'axios';
import { CREATE_AN_INITIATIVE,  CONFIRM_USER } from "../../constants/actions";
import {  VERIFY_USER} from "../../constants/apiList";


import Swagger from 'swagger-client';

export const sendInitiativeDetails = (initiativeDetails, access_token) => {
  return function (dispatch) {
    return Swagger(process.env.REACT_APP_API_URI,
      {
        requestInterceptor: (req) => {
          req.headers['Authorization'] = access_token;
          return req;
        },
      })
      .then((client) => {

        let postBody = {
          "title": initiativeDetails.title,
          "description": initiativeDetails.description,
          "lead": initiativeDetails.leadId
        };
        postBody = JSON.stringify(postBody)

        return client
          .apis
          .initiative
          .initiative_create({ data: postBody });

      });
  }
}
export const updateInitiativeInfo = (initiativeInfo) => {
  return {
    type: CREATE_AN_INITIATIVE,
    payload: initiativeInfo
  };
}

export const verifyUser = (eventObj,accessToken) => {
  const url = decodeURIComponent(VERIFY_USER+'{"where":{"username":"'+eventObj.lead+'"}}&access_token='+accessToken.id);
  const request = axios.get(url);
  return {
    type: CONFIRM_USER,
    payload: request
  };
}