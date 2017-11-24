import axios from 'axios';

import { CREATE_AN_EVENT, GET_INITIATIVES, CONFIRM_USER } from "../../constants/actions";
import CreateEvent from '../../components/createEvent';
import { CREATE_NEW_EVENT, APPROVED_INITIATIVES, VERIFY_USER} from "../../constants/apiList";

export const sendEventDetails = (eventObj,userInfoObj) => {

  const request = axios.post(CREATE_NEW_EVENT+'?access_token='+userInfoObj.id,
  /*{
      "title": initiativeDetails.initiativeName,
  		"description": "This is sample description",
      "status": "open",
      "createdOn": initiativeDetails.intiativeStartDate,
      "active": true,
      "lead": initiativeDetails.approverName,
      "createdBy": userInfoObj.userId,
      "categoryId": 1,
  		"created": userInfoObj.created
  }*/
  {
    "title": eventObj.title,
    "description": "prayaas2 desc",
    "status": "Open",
    "createdOn": "2017-11-12",
    "active": true,
    "lead": "2",
    "createdBy": "7",
    "categoryId":"2",
    "created": "2017-11-12"

  });

  return {
    type: CREATE_AN_EVENT,
    payload: request
  };
}
export const getApprovedInitiatives = (accessToken) => {
  const request = axios.get(APPROVED_INITIATIVES +"&access_token="+accessToken);
  return {
    type: GET_INITIATIVES,
    payload: request
  };
}

export const verifyUser = (eventObj,accessToken) => {
  console.log(eventObj.lead, accessToken.id);
  const url = decodeURIComponent(VERIFY_USER+'{"where":{"username":"'+eventObj.lead+'"}}&access_token='+accessToken.id);
  const request = axios.get(url);
  console.log(request+"VerifyUserreq");
  return {
    type: CONFIRM_USER,
    payload: request
  };
}
