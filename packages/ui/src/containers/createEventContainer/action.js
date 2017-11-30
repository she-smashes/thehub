import axios from 'axios';

import { CREATE_AN_EVENT, GET_INITIATIVES, GET_CATEGORIES } from "../../constants/actions";
import CreateEvent from '../../components/createEvent';
import { CREATE_NEW_EVENT, APPROVED_INITIATIVES, VERIFY_USER, ALL_CATEGORIES, CREATE_NEW_INITIATIVE} from "../../constants/apiList";
import Swagger from 'swagger-client';
import { SWAGGER_SPEC_URL } from "../../constants/apiList";

export const sendEventDetails = (eventObj, userInfoObj) => {
  const hourly = eventObj.hourlyParticipant;
  const nonhourly = eventObj.nonHourlyParticipant;
  const participant = hourly.concat(nonhourly);
  return function (dispatch) {
    return Swagger(process.env.REACT_APP_API_URI,
      {
        requestInterceptor: (req) => {
          req.headers['Authorization'] = userInfoObj.id;
          return req;
        },
      })
      .then((client) => {

        let postBody =   {
          "initiativeId": eventObj.initiativeName,
          "title": eventObj.title,
          "startDate": eventObj.eventStartDate,
          "endDate": eventObj.eventEndDate,
          "location": eventObj.location,
          "description": eventObj.description,
          "lead": eventObj.leadId,
          "createdBy": userInfoObj.userId,
          "eventHourFlag": 0,
          "participantType": [
             participant
          ],
          "categoryId": eventObj.category
        };
        postBody = JSON.stringify(postBody)

        return client
          .apis
          .event
          .event_create({ data: postBody });

      });
  }
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
  return {
    type: GET_CATEGORIES,
    payload: request
  };
}