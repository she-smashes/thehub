/**
 * @author Uma Govindaraj
 * @description A index file to map state and props for event
 */


import {connect} from 'react-redux';
import ViewEvent from '../../components/viewEvent';
import {getEventList, updateViewEventsInfo, updateCategoryEventsInfo} from './action';


const mapStateToProps = (state) => {
  console.log(state);
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
    getEventList : ( accessToken, categoryId ) => {
      return dispatch(getEventList(accessToken, categoryId, dispatch))
    },
    updateViewEventsInfo : (eventDetails) => {
      return dispatch(updateViewEventsInfo(eventDetails));
    },
    updateCategoryEventsInfo : (eventDetails) => {
      return dispatch(updateCategoryEventsInfo(eventDetails));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewEvent);
