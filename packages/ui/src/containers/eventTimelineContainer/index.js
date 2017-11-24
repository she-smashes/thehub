import { connect } from 'react-redux';
import EventTimelineWidget from '../../components/eventTimelineWidget';
import { getEventList } from './action';

const mapStateToProps = (state) => {
  return {
    events: state.eventsList,
    userInfo: state.userInfo
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getEventList: (accessToken) => {
      dispatch(getEventList(accessToken, dispatch))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(EventTimelineWidget);