import {connect} from 'react-redux';
import EventDetails from '../../components/eventDetails';
import {getEventDetails} from './action';

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo
  }
}

const mapDisptchToProps = (dispatch, ownProps) => {
  return {
    getEventDetails : (id) => {
      return dispatch(getEventDetails(id, dispatch))
    }
  }
}
export default connect(mapStateToProps, mapDisptchToProps)(EventDetails);
