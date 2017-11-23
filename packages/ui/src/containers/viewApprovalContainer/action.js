/**
 * @author Uma Govindaraj
 * @description Action file to make the API call
 */

import axios from 'axios';

import { DEFAULT_TASKS } from "../../constants/actions";
import { APPROVE_TASK } from "../../constants/actions";
import { GET_TASKS } from "../../constants/apiList";
import { UPDATE_TASK } from "../../constants/apiList";

/**
 * Invoke the getTaskList API
 * @param {*the access token for the user who is logged in} accessToken 
 */
export const getTaskList = (accessToken) => {
  const request = axios.get(GET_TASKS + '?access_token=' + accessToken);

  return {
    type: DEFAULT_TASKS,
    payload: request
  };
}
/**
 * Approves the specified task
 * @param {*the access token for the user who is logged in} accessToken 
 * @param {*the task id that is to be approved} taskId 
 */
export const approveTask = (accessToken, taskId) => {
  const request = axios.put(UPDATE_TASK + "/" + taskId + "?" + accessToken,
    {
      "status": "approved"
    });
  return {
    type: APPROVE_TASK,
    payload: request
  };


}
