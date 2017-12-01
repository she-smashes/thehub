import { connect } from 'react-redux';
import CreateInitiative from '../../components/createInitiative';
import { sendInitiativeDetails, updateInitiativeInfo } from './action';
import { verifyUser } from '../appContainer/action';


const mapStateToProps = (state) => {
  return {
    verifyUser: state.verifyUser,
    userInfo: state.userInfo
  }
}

const mapDisptchToProps = (dispatch, ownProps) => {
  return {
    sendInitiativeDetails: (initiativeDetails, userInfo) => {
      return dispatch(sendInitiativeDetails(initiativeDetails, userInfo, dispatch))
    }, updateInitiativeInfo: (initiativeInfo) => {
      return dispatch(updateInitiativeInfo(initiativeInfo))
    }, verifyUser: (username, userInfo) => {
      return dispatch(verifyUser(username, userInfo, dispatch))
    }
  }
}
export default connect(mapStateToProps, mapDisptchToProps)(CreateInitiative);