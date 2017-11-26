import {connect} from 'react-redux';
import Header  from '../../components/header';

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo
  }
}


const mapDisptchToProps = (dispatch, ownProps) => {
  return {getDetails : () => {return 'hello'; }}
}

export default connect(mapStateToProps,mapDisptchToProps)(Header);
