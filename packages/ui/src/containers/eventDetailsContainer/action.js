import { GET_EVENTDETAILS } from "../../constants/actions";
import { GET_ENROLLMENTDETAILS } from "../../constants/actions";
import { UPDATE_ENROLLMENTDETAILS } from "../../constants/actions";

import Swagger from 'swagger-client';

export const getEventDetails = (eventId, access_token) => {

  return function (dispatch) {
    return Swagger(process.env.REACT_APP_API_URI,
      {
        requestInterceptor: (req) => {
          req.headers['Authorization'] = access_token;
          return req;
        },
      })
      .then((client) => {


        let filterQuery = { include: "enrollments" };
        filterQuery = JSON.stringify(filterQuery)

        return client
          .apis
          .event
          .event_findById({ id: eventId, filter: filterQuery });
      });
  }
}
export const registerUserForEvent = (eventId, userId, registerFlag,  participantId, enrollmentId, access_token) => {

  return function (dispatch) {
    return Swagger(process.env.REACT_APP_API_URI,
      {
        requestInterceptor: (req) => {
          req.headers['Authorization'] = access_token;
          return req;
        },
      })
      .then((client) => {
console.log(participantId);

        if (registerFlag) {
          let postBody = {
            "eventId": eventId,
            "userId": userId,
            "registeredOn": new Date(),
            "enrollmentType": participantId
          };
          postBody = JSON.stringify(postBody);
          console.log(postBody);
          return client
            .apis
            .event
            .event_prototype___create__enrollments({ id: eventId, data: postBody });
        } else {
          return client
            .apis
            .event
            .event_prototype___destroyById__enrollments({ id: eventId, fk: enrollmentId });
        }

      });
  }
}

export const getEnrollmentDetails = (eventId, userId, access_token) => {

  return function (dispatch) {
    return Swagger(process.env.REACT_APP_API_URI,
      {
        requestInterceptor: (req) => {
          req.headers['Authorization'] = access_token;
          return req;
        },
      })
      .then((client) => {
        console.log('eventId = ' + eventId);
        let filterQuery = { include: "events" };
        filterQuery = JSON.stringify(filterQuery)


        return client
          .apis
          .event
          .event_prototype___get__enrollments({ id: eventId, filter: filterQuery });

      });
  }
}

export const updateEventDetails = (userId, eventDetailsInfo) => {

  let evDet = {};
  eventDetailsInfo.registered = false;
  if (eventDetailsInfo.enrollments != undefined) {
    eventDetailsInfo.enrollments.map(enrollmentDetail => {
      if (enrollmentDetail.userId === userId) {
        eventDetailsInfo.registered = true;
        eventDetailsInfo.enrollmentId = enrollmentDetail.id;
        eventDetailsInfo.enrollmentParticipantId = enrollmentDetail.participantId;
      }
    });
  }

  return {
    type: GET_EVENTDETAILS,
    payload: eventDetailsInfo
  };
}

export const updateEnrollmentDetails = (userId, enrollmentDetailsInfo) => {

  let registered = false;
  enrollmentDetailsInfo.map(enrollDetail => {
    console.log('enrollDetail = ' + enrollDetail);

    if (userId === enrollDetail.userId) {
      registered = true;
    }
  });

  return {
    type: UPDATE_ENROLLMENTDETAILS,
    payload: { 'registered': registered }
  };
}

