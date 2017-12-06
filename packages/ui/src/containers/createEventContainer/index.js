import {connect} from 'react-redux';
import CreateEvent from '../../components/createEvent';
import {sendEventDetails, getApprovedInitiatives, getCategories, getParticipantList, updateParticipantsList, updateCategoriesList, updateApprovedInitiativesList} from './action';
import {verifyUser} from '../appContainer/action';

const mapStateToProps = (state) => {
  return {
    createEvent: state.createEvent, //reducer name
    userInfo:state.userInfo,
    verifyUser: state.verifyUser,
    approvedInitiatives: state.approvedInitiatives,
    categories: state.categories,
    participants: state.participants
  }
}

const mapDisptchToProps = (dispatch, ownProps) => {
  return {
    sendEventDetails : (eventObj,userInfoObj) => {
       return dispatch(sendEventDetails(eventObj,userInfoObj, dispatch))
    },
    getApprovedInitiatives : (userInfo) => {
      return dispatch(getApprovedInitiatives(userInfo, dispatch))
    },
    getCategories : (userInfo) => {
      return dispatch(getCategories(userInfo, dispatch))
    },
    verifyUser : (username, userInfo) => {
      return dispatch(verifyUser(username, userInfo, dispatch))
    },
    getParticipantList : (userInfo) => {
      return dispatch(getParticipantList(userInfo, dispatch))
    },
    updateParticipantsList : (participantInfo) => {
      return dispatch(updateParticipantsList(participantInfo, dispatch))
    },
    updateCategoriesList : (categoriesInfo) => {
      return dispatch(updateCategoriesList(categoriesInfo, dispatch))
    },
    updateApprovedInitiativesList : (initiativesInfo) => {
      return dispatch(updateApprovedInitiativesList(initiativesInfo, dispatch))
    }
  }
}
export default connect(mapStateToProps, mapDisptchToProps)(CreateEvent);
