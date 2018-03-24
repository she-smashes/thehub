import {connect} from 'react-redux';
import Header  from '../../components/header';
import { resetStore } from './action';

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    resetStore: () => {
      return dispatch(resetStore())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);