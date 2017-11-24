/**
 * @author Uma Govindaraj
 * @description A index file to map state and props for event
 */


import {connect} from 'react-redux';
import ViewEvent from '../../components/viewEvent';
import {getEventList} from './action';


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
      dispatch(getEventList(accessToken, dispatch))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewEvent);
