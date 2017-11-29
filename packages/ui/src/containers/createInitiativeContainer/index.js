import { connect } from 'react-redux';
import CreateInitiative from '../../components/createInitiative';
import { sendInitiativeDetails, updateInitiativeInfo, verifyUser } from './action';


const mapStateToProps = (state) => {
  return {
    createInitiativeformData: state.newInitiative, //reducer name
    verifyUser: state.verifyUser,
    userInfo: state.userInfo
  }
}

const mapDisptchToProps = (dispatch, ownProps) => {
  return {
    sendInitiativeDetails: (initiativeDetails, userId, access_token) => {
      return dispatch(sendInitiativeDetails(initiativeDetails, userId, access_token, dispatch))
    }, updateInitiativeInfo: (initiativeInfo) => {
      return dispatch(updateInitiativeInfo(initiativeInfo))
    }, verifyUser: (initiativeObj, accessToken) => {
      return dispatch(verifyUser(initiativeObj, accessToken, dispatch))
    }
  }
}
export default connect(mapStateToProps, mapDisptchToProps)(CreateInitiative);