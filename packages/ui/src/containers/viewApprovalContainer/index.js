/**
 * @author Uma Govindaraj
 * @description A index file to map state and props for task
 */


import {connect} from 'react-redux';
import Task from '../../components/task';
import {getTaskList} from './action';
import {approveTask} from './action';

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
      dispatch(getTaskList(accessToken, dispatch))
    },
    /**
     * This method approves the specified task.
     */
    approveTask: (accessToken, taskId) => {
      dispatch(approveTask(accessToken, taskId, dispatch))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Task);
