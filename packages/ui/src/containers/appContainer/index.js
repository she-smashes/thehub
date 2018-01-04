import {connect} from 'react-redux';
import App  from '../../components/app';
import {getUserInfo, updateNotificationCount} from './action';

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getUserInfo : (userInfo) => {
      return dispatch(getUserInfo(userInfo, dispatch))
    },
    updateNotificationCount : (userInfo) => {
      return dispatch(updateNotificationCount(userInfo))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
