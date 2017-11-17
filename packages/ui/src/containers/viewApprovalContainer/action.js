import axios from 'axios';

import { DEFAULT_TASKS } from "../../constants/actions";
import { APPROVE_TASK } from "../../constants/actions";
import { GET_TASKS } from "../../constants/apiList";
import { UPDATE_TASK } from "../../constants/apiList";

export const getTaskList = (accessToken) => {
  const request = axios.get(GET_TASKS + '?access_token=' + accessToken);

  return {
    type: DEFAULT_TASKS,
    payload: request
  };
}

export const approveTask = (accessToken, taskId) => {
  console.log('actionnnnnnnnnnnnn', taskId);

  const request = axios.put(UPDATE_TASK + "/" + taskId + "?" + accessToken,
    {
      "status": "approved"
    });
  console.log(request)
  return {
    type: APPROVE_TASK,
    payload: request
  };


}
