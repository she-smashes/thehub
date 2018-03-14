import { connect } from 'react-redux';
import ViewAllBadges from '../../components/viewAllBadges';
import { getAllBadgesList,updateAllBadgesInfo } from './action';

const mapStateToProps = (state) => {
  return {
    badges: state.allBadgesList,
    userInfo: state.userInfo
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getAllBadgesList: (accessToken) => {
      return dispatch(getAllBadgesList(accessToken, dispatch))
    },
    updateAllBadgesInfo : (badgesDetails) => {
      return dispatch(updateAllBadgesInfo(badgesDetails));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewAllBadges);