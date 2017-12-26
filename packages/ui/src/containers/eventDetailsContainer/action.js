import { GET_EVENTDETAILS } from "../../constants/actions";
import { GET_ENROLLMENTDETAILS } from "../../constants/actions";
import { GET_EVENTENROLLMENTDETAILS } from "../../constants/actions";

import Swagger from 'swagger-client';

export const getAllEnrollmentsForEvent = (eventId, userInfo) => {
  
    return function (dispatch) {
      return Swagger(process.env.REACT_APP_API_URI,
        {
          requestInterceptor: (req) => {
            req.headers['Authorization'] = userInfo.id;
            return req;
          },
        })
        .then((client) => {
          let filterQuery = { include: ["users", "participants"] };
          filterQuery = JSON.stringify(filterQuery)

          return client
          .apis
          .event
          .event_prototype___get__enrollments({ id: eventId, filter: filterQuery });
        });
    }
  }

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

          // commenting since enrollment type is not required while registering for an event
         /*  let postBody = {
            "eventId": eventId,
            "userId": userInfo.userId,
            "registeredOn": new Date(),
            "enrollmentType": enrollmentInfo.enrollmentParticipantId
          }; */
          let postBody = {
            "eventId": eventId,
            "userId": userInfo.userId,
            "registeredOn": new Date()
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


export const updateEventEnrollmentsData = (userInfo, eventEnrollmentsInfo) => {
    return {
      type: GET_EVENTENROLLMENTDETAILS,
      payload: eventEnrollmentsInfo
    };
  }