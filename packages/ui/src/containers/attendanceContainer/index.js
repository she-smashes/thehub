import { connect } from 'react-redux';
import AttendanceWidget from '../../components/attendanceWidget';
import { getAttendanceInfo, updateAttendanceInfo } from './action';

const mapStateToProps = (state) => {
  return {
    attendanceInfo: state.attendanceInfo,
    userInfo: state.userInfo
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getAttendanceInfo: (userId, accessToken) => {
      return dispatch(getAttendanceInfo(userId, accessToken, dispatch))
    },
    updateAttendanceInfo: (attendanceInfo) => {
      return dispatch(updateAttendanceInfo(attendanceInfo))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AttendanceWidget);