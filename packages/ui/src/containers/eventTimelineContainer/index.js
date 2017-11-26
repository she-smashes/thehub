import { connect } from 'react-redux';
import EventTimelineWidget from '../../components/eventTimelineWidget';
import { getEventList,updateEventTimelineInfo } from './action';

const mapStateToProps = (state) => {
  return {
    events: state.eventsList,
    userInfo: state.userInfo
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getEventList: (accessToken) => {
      return dispatch(getEventList(accessToken, dispatch))
    },
    updateEventTimelineInfo : (eventTimeLineDetails) => {
      return dispatch(updateEventTimelineInfo(eventTimeLineDetails));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(EventTimelineWidget);