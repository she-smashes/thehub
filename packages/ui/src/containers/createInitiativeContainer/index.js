import {connect} from 'react-redux';
import CreateInitiative from '../../components/createInitiative';
import {sendInitiativeDetails} from './action';

const mapStateToProps = (state) => {
  return {
    createInitiativeformData: state.newInitiative, //reducer name
    userInfo:state.userInfo
  }
}

const mapDisptchToProps = (dispatch, ownProps) => {
  return {
    sendInitiativeDetails : (initiativeDetails,userInfoObj) => {
      return dispatch(sendInitiativeDetails(initiativeDetails, userInfoObj,dispatch))
    }
  }
}
export default connect(mapStateToProps, mapDisptchToProps)(CreateInitiative);