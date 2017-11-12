import {connect} from 'react-redux';
import ViewInitiative from '../../components/viewInitiative';
import {getInitiativeList} from './action';

const mapStateToProps = (state) => {
  return {
    viewInitiatives: state.viewInitiatives,
    userInfo: state.userInfo
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getInitiativeList : ( accessToken ) => {
      dispatch(getInitiativeList(accessToken, dispatch))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewInitiative);
