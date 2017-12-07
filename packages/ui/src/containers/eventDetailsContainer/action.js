import { GET_EVENTDETAILS } from "../../constants/actions";
import { GET_ENROLLMENTDETAILS } from "../../constants/actions";
import { UPDATE_ENROLLMENTDETAILS } from "../../constants/actions";

import Swagger from 'swagger-client';

export const getEventDetails = (eventId, userInfo) => {

  return function (dispatch) {
    return Swagger(process.env.REACT_APP_API_URI,
      {
        requestInterceptor: (req) => {
          req.headers['Authorization'] = userInfo.id;
          return req;
        },
      })
      .then((client) => {


        let filterQuery = { include: ["participants", "enrollments"] };
        filterQuery = JSON.stringify(filterQuery)

        return client
          .apis
          .event
          .event_findById({ id: eventId, filter: filterQuery });
      });
  }
}
export const registerUserForEvent = (eventId, userInfo, enrollmentInfo) => {

  return function (dispatch) {
    return Swagger(process.env.REACT_APP_API_URI,
      {
        requestInterceptor: (req) => {
          req.headers['Authorization'] = userInfo.id;
          return req;
        },
      })
      .then((client) => {

        if (!enrollmentInfo.registered) {
          let postBody = {
            "eventId": eventId,
            "userId": userInfo.userId,
            "registeredOn": new Date(),
            "enrollmentType": enrollmentInfo.enrollmentParticipantId
          };
          postBody = JSON.stringify(postBody);
          return client
            .apis
            .event
            .event_prototype___create__enrollments({ id: eventId, data: postBody });
        } else {
          return client
            .apis
            .event
            .event_prototype___destroyById__enrollments({ id: eventId, fk: enrollmentInfo.enrollmentId });
        }

      });
  }
}

export const updateEventDetails = (userInfo, eventDetailsInfo) => {

  let evDet = {};
  eventDetailsInfo.registered = false;
  if (eventDetailsInfo.enrollments != undefined) {
    eventDetailsInfo.enrollments.map(enrollmentDetail => {
      if (enrollmentDetail.userId === userInfo.userId) {
        eventDetailsInfo.registered = true;
        eventDetailsInfo.enrollmentId = enrollmentDetail.id;
        eventDetailsInfo.enrollmentParticipantId = enrollmentDetail.enrollmentType;
      } else {
        eventDetailsInfo.registered = false;
        eventDetailsInfo.enrollmentId = '';
        eventDetailsInfo.enrollmentParticipantId = '';
      }
    });
  }
  return {
    type: GET_EVENTDETAILS,
    payload: eventDetailsInfo
  };
}


