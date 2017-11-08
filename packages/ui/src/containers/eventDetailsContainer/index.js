import {connect} from 'react-redux';
import EventDetails from '../../components/eventDetails';
import {getEventDetails} from './action';

const mapStateToProps = (state) => {
  return {
    eventDetails: state.eventDetails
  }
}

const mapDisptchToProps = (dispatch, ownProps) => {
  return {
    getEventDetails : (id) => {
      dispatch(getEventDetails(id, dispatch))
    }
  }
}
export default connect(mapStateToProps, mapDisptchToProps)(EventDetails);
