import {connect} from 'react-redux';
import CreateEvent from '../../components/createEvent';
import {sendEventDetails} from './action';

const mapStateToProps = (state) => {
  return {
    createEventformData: state.createEvent, //reducer name
    userInfo:state.userInfo
  }
}

const mapDisptchToProps = (dispatch, ownProps) => {
  return {
    sendEventDetails : (initiativeDetails,userInfoObj) => {
      return dispatch(sendEventDetails(initiativeDetails, userInfoObj, dispatch))
    }
  }
}
export default connect(mapStateToProps, mapDisptchToProps)(CreateEvent);
