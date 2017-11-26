import axios from 'axios';

import { CREATE_AN_EVENT, GET_INITIATIVES, CONFIRM_USER, GET_CATEGORIES } from "../../constants/actions";
import CreateEvent from '../../components/createEvent';
import { CREATE_NEW_EVENT, APPROVED_INITIATIVES, VERIFY_USER, ALL_CATEGORIES, CREATE_NEW_INITIATIVE} from "../../constants/apiList";
import Swagger from 'swagger-client';
import { SWAGGER_SPEC_URL } from "../../constants/apiList";
export const sendEventDetails = (eventObj,userInfoObj) => {
  const hourly = eventObj.hourlyParticipant;
  const nonhourly = eventObj.nonHourlyParticipant;
  const participant = hourly.concat(nonhourly);
  const request = axios.post(CREATE_NEW_EVENT+'?access_token='+userInfoObj.id,
    {
    "initiativeId": eventObj.initiativeName,
    "title": eventObj.title,
    "startDate": "2017-11-27T09:49:12.481Z",
    "endDate": "2017-11-28T09:49:12.481Z",
    "location": eventObj.location,
    "description": eventObj.description,
    "lead": eventObj.lead,
    "createdBy": userInfoObj.userId,
    "eventHourFlag": 0,
    "participantType": [
       participant
    ],
    "categoryId": eventObj.category
  }
);

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
