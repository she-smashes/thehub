import { connect } from 'react-redux';
import ViewAllBadgesToBeClaimed from '../../components/viewAllBadgesToBeClaimed';
import { getBadgesToBeClaimedList,updateBadgesToBeClaimedInfo, claimBadge } from './action';

const mapStateToProps = (state) => {
  return {
    badgesToBeClaimedList: state.badgesToBeClaimedList,
    userInfo: state.userInfo
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getBadgesToBeClaimedList: (accessToken) => {
      return dispatch(getBadgesToBeClaimedList(accessToken, dispatch))
    },
    updateBadgesToBeClaimedInfo : (badgesDetails) => {
      return dispatch(updateBadgesToBeClaimedInfo(badgesDetails));
    },
    claimBadge : (badgeId, userInfo) => {
      return dispatch(claimBadge(badgeId, userInfo));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewAllBadgesToBeClaimed);