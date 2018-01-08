/**
 * @author Uma Govindaraj
 * @description A index file to map state and props for task
 */


import {connect} from 'react-redux';
import Task from '../../components/task';
import {getTaskList, approveTask, updateTaskInfo} from './action';
import { updateUserInfo } from '../loginFormContainer/action';

const mapStateToProps = (state) => {
  return {
    viewTasks: state.viewTasks,
    userInfo: state.userInfo
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    /**
     * This method gets the task list.
     */
    getTaskList : ( accessToken ) => {
      return dispatch(getTaskList(accessToken, dispatch))
    },
    /**
     * This method approves the specified task.
     */
    approveTask: (accessToken, taskId) => {
      return dispatch(approveTask(accessToken, taskId, dispatch))
    },
    updateTaskInfo : (type, taskDetails) => {
      return dispatch(updateTaskInfo(type, taskDetails));
    },
    updateUserInfo : (userInfo) => {
      return dispatch(updateUserInfo(userInfo))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Task);
