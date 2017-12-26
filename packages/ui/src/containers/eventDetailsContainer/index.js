import {connect} from 'react-redux';
import EventDetails from '../../components/eventDetails';
import {getEventDetails, registerUserForEvent, updateEventDetails, getAllEnrollmentsForEvent, updateEventEnrollmentsData} from './action';


const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
    eventDetails: state.eventDetails,
    enrollmentDetails: state.enrollmentDetails,
    eventEnrollmentsDetails: state.eventEnrollmentsDetails
  }
}

const mapDisptchToProps = (dispatch, ownProps) => {
  return {
    getEventDetails : (id, userInfo) => {
      return dispatch(getEventDetails(id, userInfo, dispatch));
    },
    registerUserForEvent : (eventId, userInfo, enrollmentInfo) => {
      return dispatch(registerUserForEvent(eventId, userInfo, enrollmentInfo, dispatch));
    },
    updateEventDetails : (userInfo, eventDetails) => {
      return dispatch(updateEventDetails(userInfo, eventDetails));
    },
    getAllEnrollmentsForEvent : (id, userInfo) => {
      return dispatch(getAllEnrollmentsForEvent(id, userInfo, dispatch));
    },
    updateEventEnrollmentsData : (id, userInfo) => {
      return dispatch(updateEventEnrollmentsData(id, userInfo, dispatch));
    }
  }
}

export default connect(mapStateToProps, mapDisptchToProps)(EventDetails);
