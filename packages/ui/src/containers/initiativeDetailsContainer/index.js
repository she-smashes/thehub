import {connect} from 'react-redux';
import InitiativeDetails from '../../components/initiativeDetails';
import {getInitiativeDetails, updateInitiativeDetails} from './action';


const mapStateToProps = (state) => {

  return {
    userInfo: state.userInfo,
    initiativeDetails: state.initiativeDetails
  }
}

const mapDisptchToProps = (dispatch, ownProps) => {
  return {
    getInitiativeDetails : (id, userInfo) => {
      return dispatch(getInitiativeDetails(id, userInfo, dispatch));
    },
    updateInitiativeDetails : (userInfo, initiativeDetails) => {
      return dispatch(updateInitiativeDetails(userInfo, initiativeDetails));
    }
  }
}

export default connect(mapStateToProps, mapDisptchToProps)(InitiativeDetails);
