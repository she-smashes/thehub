import { connect } from 'react-redux';
import ClaimYourBadgeWidget from '../../components/claimYourBadgeWidget';
import { getBadgesToBeClaimedList,updateBadgesToBeClaimedInfo, claimBadge } from './action';

const mapStateToProps = (state) => {
  return {
    badgesCanBeClaimedList: state.badgesCanBeClaimedList,
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
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ClaimYourBadgeWidget);