import {connect} from 'react-redux';
import Header  from '../../components/header';

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo
  }
}

export default connect(mapStateToProps)(Header);