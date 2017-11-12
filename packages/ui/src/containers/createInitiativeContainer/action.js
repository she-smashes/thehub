import axios from 'axios';

import { CREATE_AN_INITIATIVE } from "../../constants/actions";
import CreateInitiative from '../../components/createInitiative';
import { CREATE_NEW_INITIATIVE } from "../../constants/apiList"

export const sendInitiativeDetails = (initiativeDetails,userInfoObj) => {

  const request = axios.post(CREATE_NEW_INITIATIVE+'?access_token='+userInfoObj.id,
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
    "title": "prayaas2",
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
    type: CREATE_AN_INITIATIVE,
    payload: request
  };
}
