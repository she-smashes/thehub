import {connect} from 'react-redux';
import CreateEvent from '../../components/createEvent';
import {sendEventDetails, getApprovedInitiatives, verifyUser, getCategories} from './action';

const mapStateToProps = (state) => {
  return {
    createEventformData: state.createEvent, //reducer name
    userInfo:state.userInfo,
    verifyUser: state.verifyUser,
    approvedInitiatives: state.approvedInitiatives,
    categories: state.categories
  }
}

const mapDisptchToProps = (dispatch, ownProps) => {
  return {
    sendEventDetails : (initiativeDetails,userInfoObj) => {
       dispatch(sendEventDetails(initiativeDetails, userInfoObj, dispatch))
    },
    getApprovedInitiatives : (accessToken) => {
      dispatch(getApprovedInitiatives(accessToken, dispatch))
    },
    getCategories : (accessToken) => {
      dispatch(getCategories(accessToken, dispatch))
    },
    verifyUser : (eventObj, accessToken) => {
      return dispatch(verifyUser(eventObj, accessToken, dispatch))
    }
  }
}
export default connect(mapStateToProps, mapDisptchToProps)(CreateEvent);
