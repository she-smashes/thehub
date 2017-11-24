import axios from 'axios';

import { CREATE_AN_EVENT, GET_INITIATIVES, CONFIRM_USER, GET_CATEGORIES } from "../../constants/actions";
import CreateEvent from '../../components/createEvent';
import { CREATE_NEW_EVENT, APPROVED_INITIATIVES, VERIFY_USER, ALL_CATEGORIES, CREATE_NEW_INITIATIVE} from "../../constants/apiList";
import Swagger from 'swagger-client';
import { SWAGGER_SPEC_URL } from "../../constants/apiList";
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
export const getApprovedInitiatives = (payload) => {
  const request = axios.get(CREATE_NEW_INITIATIVE+'?filter='+payload.filterParam+'&access_token='+payload.accessToken);  
  return {
    type: GET_INITIATIVES,
    payload: request
  };
}
export const getCategories = (accessToken) => {
  const request = axios.get(ALL_CATEGORIES +"?access_token="+accessToken);
  console.log(request);
  return {
    type: GET_CATEGORIES,
    payload: request
  };
}
export const verifyUser = (eventObj,accessToken) => {  
  const url = decodeURIComponent(VERIFY_USER+'{"where":{"username":"'+eventObj.lead+'"}}&access_token='+accessToken.id);
  const request = axios.get(url);
  return {
    type: CONFIRM_USER,
    payload: request
  };

/*  return function (dispatch) {
    Swagger(SWAGGER_SPEC_URL,
      {
        requestInterceptor: (req) => {
          req.headers['Authorization'] = accessToken;
          return req;
        },
      })
      .then((client) => {
        let filterQuery = {"where":{"username":eventObj.lead}};
        filterQuery = JSON.stringify(filterQuery)

        client
          .apis
          .event
          .event_create({filter: filterQuery})
          .then(resp => dispatch(getResponse(resp)),
        )
      });
  }*/
}
/*function getResponse(resp) {
  return {
    type: CONFIRM_USER,
    payload: resp
  };
}*/
