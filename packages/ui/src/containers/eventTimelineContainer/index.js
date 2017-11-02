import {connect} from 'react-redux';
import EventTimelineWidget from '../../components/eventTimelineWidget';
import {getEventList, updateEventList} from './action';

const mapStateToProps = (state) => {
  return {
    events: state.eventsList,
    userInfo: state.userInfo
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getEventList : () => {
      dispatch(getEventList(dispatch))
    },
    updateEvents: () => {
      dispatch(updateEventList(dispatch))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(EventTimelineWidget);