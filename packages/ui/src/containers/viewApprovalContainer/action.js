/**
 * @author Uma Govindaraj
 * @description Action file to make the API call
 */
import Swagger from 'swagger-client';

import { SWAGGER_SPEC_URL } from "../../constants/apiList";

/**
 * Invoke the getTaskList API
 * @param {*the access token for the user who is logged in} accessToken 
 */
export const getTaskList = (access_token) => {

  return function (dispatch) {
    return Swagger(SWAGGER_SPEC_URL,
      {
        requestInterceptor: (req) => {
          req.headers['Authorization'] = access_token;
          return req;
        },
      })
      .then((client) => {

        return client
          .apis
          .task
          .task_listPendingTasks();
      });
  }
}
export const updateTaskInfo = (type, taskInfo) => {
  return {
    type: type,
    payload: taskInfo
  }
}

/**
* Approves the specified task
* @param {*the access token for the user who is logged in} accessToken 
* @param {*the task id that is to be approved} taskId 
*/
export const approveTask = (access_token, taskId) => {

  return function (dispatch) {
    return Swagger(SWAGGER_SPEC_URL,
      {
        requestInterceptor: (req) => {
          req.headers['Authorization'] = access_token;
          return req;
        },
      })
      .then((client) => {

        let putBody = { "status": "approved" };
        putBody = JSON.stringify(putBody);
        let filterQuery = { "id": taskId };
        filterQuery = JSON.stringify(filterQuery)
        return client
          .apis
          .task
          .task_prototype_patchAttributes({ id: taskId, data: putBody });
      });
  }

}





