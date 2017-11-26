import {connect} from 'react-redux';
import EventDetails from '../../components/eventDetails';
import {getEventDetails, registerUserForEvent, updateEventDetails} from './action';


const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
    eventDetails: state.eventDetails
  }
}

const mapDisptchToProps = (dispatch, ownProps) => {
  return {
    getEventDetails : (id, access_token) => {
      return dispatch(getEventDetails(id, access_token, dispatch));
    },
    registerUserForEvent : (eventId, userId, access_token) => {
      return dispatch(registerUserForEvent(eventId, userId, access_token, dispatch));
    },
    updateEventDetails : (eventDetails) => {
      return dispatch(updateEventDetails(eventDetails));
    }
  }
}

export default connect(mapStateToProps, mapDisptchToProps)(EventDetails);
