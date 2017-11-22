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
    getEventDetails : (id, access_token) => {
      return dispatch(getEventDetails(id, access_token, dispatch)).then(() =>
     console.log('hhhhhhhhhhh')
    );
    }
  }
}

export default connect(mapStateToProps, mapDisptchToProps)(EventDetails);
