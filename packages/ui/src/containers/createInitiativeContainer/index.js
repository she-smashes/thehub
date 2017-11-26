import {connect} from 'react-redux';
import CreateInitiative from '../../components/createInitiative';
import {sendInitiativeDetails, updateInitiativeInfo} from './action';

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
    }, updateInitiativeInfo : (initiativeInfo) => {
      return dispatch(updateInitiativeInfo(initiativeInfo))
    }
  }
}
export default connect(mapStateToProps, mapDisptchToProps)(CreateInitiative);