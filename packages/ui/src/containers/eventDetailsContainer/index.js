import {connect} from 'react-redux';
import EventDetails from '../../components/eventDetails';
import {getEventDetails, registerUserForEvent, updateEventDetails, getEnrollmentDetails, updateEnrollmentDetails} from './action';


const mapStateToProps = (state) => {

  return {
    userInfo: state.userInfo,
    eventDetails: state.eventDetails,
    enrollmentDetails: state.enrollmentDetails
  }
}

const mapDisptchToProps = (dispatch, ownProps) => {
  return {
    getEventDetails : (id, access_token) => {
      return dispatch(getEventDetails(id, access_token, dispatch));
    },
    registerUserForEvent : (eventId, userId, registerFlag,  participantId, enrollmentId, access_token) => {
      return dispatch(registerUserForEvent(eventId, userId, registerFlag,  participantId, enrollmentId, access_token, dispatch));
    },
    updateEventDetails : (userId, eventDetails) => {
      return dispatch(updateEventDetails(userId, eventDetails));
    },
    getEnrollmentDetails: (eventId, userId, access_token) => {
      return dispatch(getEnrollmentDetails(eventId, userId, access_token));
    },
    updateEnrollmentDetails: (userId, enrollmentDetails) => {
      return dispatch(updateEnrollmentDetails(userId, enrollmentDetails));
    }
  }
}

export default connect(mapStateToProps, mapDisptchToProps)(EventDetails);
