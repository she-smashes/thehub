import { connect } from 'react-redux';
import AttendanceWidget from '../../components/attendanceWidget';
import { getProgressCategoriesList,updateProgressCategoriesInfo } from './action';

const mapStateToProps = (state) => {
  return {
    progressCategories: state.progressCategoriesList,
    userInfo: state.userInfo
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getProgressCategoriesList: (accessToken) => {
      return dispatch(getProgressCategoriesList(accessToken, dispatch))
    },
    updateProgressCategoriesInfo : (progressCategoriesDetails) => {
      return dispatch(updateProgressCategoriesInfo(progressCategoriesDetails));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AttendanceWidget);