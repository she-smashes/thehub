import {connect} from 'react-redux';
import LoginWidget from '../../components/login';
import {loginUser, updateUserInfo, getUserAuthDetails} from './action';

const mapStateToProps = (state) => {  
  return {
    user: state.userInfo,
    authUserDetails: state.authUserDetails
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getUserAuthDetails : (token) => {
      return dispatch(getUserAuthDetails(dispatch))
    },
    loginUser  : (userInfo) => {
      return dispatch(loginUser (userInfo, dispatch))
    },
    updateUserInfo : (userInfo) => {
      return dispatch(updateUserInfo(userInfo))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginWidget);
