import {connect} from 'react-redux';
import ViewInitiative from '../../components/viewInitiative';
import {getInitiativeList, updateViewInitiativeInfo} from './action';

const mapStateToProps = (state) => {
  return {
    viewInitiatives: state.viewInitiatives,
    userInfo: state.userInfo
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getInitiativeList : ( accessToken ) => {
      return dispatch(getInitiativeList(accessToken, dispatch))
    },
    updateViewInitiativeInfo : (initiativeDetails) => {
      return dispatch(updateViewInitiativeInfo(initiativeDetails));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewInitiative);
