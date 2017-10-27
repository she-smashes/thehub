import {connect} from 'react-redux';
import EventTimelineWidget from '../../components/eventTimelineWidget';
import {getEventList} from './action';

const mapStateToProps = (state) => {
  return {
    events: state.eventsList
  }
}

const mapDisptchToProps = (dispatch, ownProps) => {
  return {
    getEventList : () => {
      dispatch(getEventList(dispatch))
    }
  }
}
export default connect(mapStateToProps, mapDisptchToProps)(EventTimelineWidget);