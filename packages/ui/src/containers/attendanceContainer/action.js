
/**
 * @author Uma Govindaraj
 * @description Action file to make the API call
 */

import Swagger from 'swagger-client';

import { ATTENDANCE_INFO } from "../../constants/actions";

export const getAttendanceInfo = (userId, access_token) => {

  return function (dispatch) {
    return Swagger(process.env.REACT_APP_API_URI,
      {
        requestInterceptor: (req) => {
          req.headers['Authorization'] = access_token;
          return req;
        },
      })
      .then((client) => {

        let filterQuery = {"where":{"userId":userId, "attendanceFlag":"submit"}};
        filterQuery = JSON.stringify(filterQuery)

        return client
          .apis
          .enrollment
          .enrollment_find();
      });
  }
}
export const updateAttendanceInfo = (attendanceInfo) => {
  return {
    type: ATTENDANCE_INFO,
    payload: attendanceInfo
  };
}





