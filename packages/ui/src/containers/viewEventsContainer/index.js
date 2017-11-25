/**
 * @author Uma Govindaraj
 * @description A index file to map state and props for event
 */


import {connect} from 'react-redux';
import ViewEvent from '../../components/viewEvent';
import {getEventList, updateViewEventsInfo} from './action';


const mapStateToProps = (state) => {
  return {
    viewEvents: state.viewEvents,
    userInfo: state.userInfo
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    /**
     * This method gets the events list.
     */
    getEventList : ( accessToken ) => {
      return dispatch(getEventList(accessToken, dispatch))
    },
    updateViewEventsInfo : (eventDetails) => {
      return dispatch(updateViewEventsInfo(eventDetails));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewEvent);
