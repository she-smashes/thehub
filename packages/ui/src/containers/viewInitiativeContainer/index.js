import {connect} from 'react-redux';
import ViewInitiative from '../../components/viewInitiative';
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
export default connect(mapStateToProps, mapDispatchToProps)(ViewInitiative);