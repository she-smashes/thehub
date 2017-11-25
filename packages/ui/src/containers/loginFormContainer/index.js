import {connect} from 'react-redux';
import LoginWidget from '../../components/login';
import {getUserInfo, updateUserInfo} from './action';

const mapStateToProps = (state) => {  
  return {
    user: state.userInfo
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getUserInfo : (userInfo) => {
      return dispatch(getUserInfo(userInfo, dispatch))
    },
    updateUserInfo : (userInfo) => {
      return dispatch(updateUserInfo(userInfo))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginWidget);
