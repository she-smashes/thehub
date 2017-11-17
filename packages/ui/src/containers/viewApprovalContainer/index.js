import {connect} from 'react-redux';
import Task from '../../components/task';
import {getTaskList} from './action';
import {approveTask} from './action';

const mapStateToProps = (state) => {
  console.log('stateeeee', state);
  return {
    viewTasks: state.viewTasks,
    userInfo: state.userInfo
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getTaskList : ( accessToken ) => {
      dispatch(getTaskList(accessToken, dispatch))
    },
    approveTask: (accessToken, taskId) => {
      console.log('aaaaaaaaasssssssssdddddfdffffffffffffff');
      dispatch(approveTask(accessToken, taskId, dispatch))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Task);
