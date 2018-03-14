import {connect} from 'react-redux';
import LoginWidget from '../../components/login';
import {loginUser, updateUserInfo} from './action';

const mapStateToProps = (state) => {  
  return {
    user: state.userInfo
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loginUser  : (userInfo) => {
      return dispatch(loginUser (userInfo, dispatch))
    },
    updateUserInfo : (userInfo) => {
      return dispatch(updateUserInfo(userInfo))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginWidget);
