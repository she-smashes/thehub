import {connect} from 'react-redux';
import EventDetails from '../../components/eventDetails';
import {getEventDetails} from './action';

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
    }
  }
}

export default connect(mapStateToProps, mapDisptchToProps)(EventDetails);
