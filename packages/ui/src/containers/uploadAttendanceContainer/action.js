import { GET_ATTENDANCEDETAILS, GET_EVENTDETAILSFORATTENDANCE } from "../../constants/actions";

import Swagger from 'swagger-client';
export const getAttendanceDetails = (eventId, userInfo) => {
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
export const updateAttendanceDetails = (userInfo, attendanceDetails) => {
  return {
    type: GET_ATTENDANCEDETAILS,
    payload: attendanceDetails
  };
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
        let filterQuery = {
          include: ["participants", {
            enrollments: ['users'],
          }]
        };

        filterQuery = JSON.stringify(filterQuery)

        return client
          .apis
          .event
          .event_findById({ id: eventId, filter: filterQuery });
      });
  }
}

export const updateEventDetails = (userInfo, eventDetailsInfo) => {
  return {
    type: GET_EVENTDETAILSFORATTENDANCE,
    payload: eventDetailsInfo
  };
}

export const saveAttendanceData = (eventId, userInfo, attendanceData, attendanceFlag) => {

  return function (dispatch) {
    return Swagger(process.env.REACT_APP_API_URI,
      {
        requestInterceptor: (req) => {
          req.headers['Authorization'] = userInfo.id;
          return req;
        },
      })
      .then((client) => {

        let postBody = {};
        postBody.userRoles = attendanceData;
        postBody.eventId = eventId;
        postBody.attendanceFlag = attendanceFlag;
        
        postBody = JSON.stringify(postBody);
        console.log(postBody);

        return client
          .apis
          .event
          .event_updateAttendance({data: postBody});
      });
  }
}

export const submitAttendanceData = (eventId, userInfo, attendanceData) => {

  return function (dispatch) {
    return Swagger(process.env.REACT_APP_API_URI,
      {
        requestInterceptor: (req) => {
          req.headers['Authorization'] = userInfo.id;
          return req;
        },
      })
      .then((client) => {

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

      });
  }
}