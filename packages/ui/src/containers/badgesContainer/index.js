import { connect } from 'react-redux';
import BadgeWidget from '../../components/badgeWidget';
import { getBadgesList,updateBadgesInfo } from './action';

const mapStateToProps = (state) => {
  return {
    badges: state.badgesList,
    userInfo: state.userInfo
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getBadgesList: (accessToken) => {
      return dispatch(getBadgesList(accessToken, dispatch))
    },
    updateBadgesInfo : (badgesDetails) => {
      return dispatch(updateBadgesInfo(badgesDetails));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(BadgeWidget);