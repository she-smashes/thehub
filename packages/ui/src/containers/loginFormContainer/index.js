import {connect} from 'react-redux';
import LoginWidget from '../../components/login';
import {getUserInfo} from './action';

const mapStateToProps = (state) => {  
  console.log(JSON.stringify(state.userInfo)+"state.eventsList");
  return {
    user: state.userInfo
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getUserInfo : () => {
      dispatch(getUserInfo(dispatch))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginWidget);
