import {connect} from 'react-redux';
import App  from '../../components/app';

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo
  }
}

export default connect(mapStateToProps)(App);