import {connect} from 'react-redux';
import UploadAttendance from '../../components/uploadAttendance';
import {getEventDetails, updateEventDetails, saveAttendanceData, submitAttendanceData} from './action';
import {verifyUsers} from '../appContainer/action';


const mapStateToProps = (state) => {
  console.log(state);
  return {
    userInfo: state.userInfo,
    eventData: state.eventData,
    verifyUsers: state.verifyUsers
  }
}

const mapDisptchToProps = (dispatch, ownProps) => {
  return {
    getEventDetails : (id, userInfo) => {
      return dispatch(getEventDetails(id, userInfo, dispatch));
    },
    updateEventDetails : (userInfo, eventDetails) => {
      return dispatch(updateEventDetails(userInfo, eventDetails));
    },
    saveAttendanceData : (eventId, userInfo, attendanceData, attendanceFlag) => {
      return dispatch(saveAttendanceData(eventId, userInfo, attendanceData, attendanceFlag));
    },
    submitAttendanceData : (id, userInfo) => {
      return dispatch(submitAttendanceData(id, userInfo, dispatch));
    },
    verifyUsers : (id, userInfo) => {
      return dispatch(verifyUsers(id, userInfo, dispatch));
    }
  }
}

export default connect(mapStateToProps, mapDisptchToProps)(UploadAttendance);
