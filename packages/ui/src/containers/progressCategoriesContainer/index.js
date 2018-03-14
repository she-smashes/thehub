import { connect } from 'react-redux';
import ProgressWidget from '../../components/progressWidget';
import { getProgressCategoriesList, updateProgressCategoriesInfo } from './action';
import { getCategories, updateCategoriesList } from './action';


const mapStateToProps = (state) => {
  return {
    progressCategories: state.progressCategoriesList,
    categories: state.categories,
    userInfo: state.userInfo
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getProgressCategoriesList: (accessToken) => {
      return dispatch(getProgressCategoriesList(accessToken, dispatch))
    },
    getCategories: (userInfo) => {
      return dispatch(getCategories(userInfo, dispatch))
    }, updateCategoriesList: (categoriesInfo) => {
      return dispatch(updateCategoriesList(categoriesInfo, dispatch))
    },
    updateProgressCategoriesInfo: (progressCategoriesDetails) => {
      return dispatch(updateProgressCategoriesInfo(progressCategoriesDetails));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProgressWidget);