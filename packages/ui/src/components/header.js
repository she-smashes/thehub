import React, { Component } from 'react';

import '../css/header.css'
import logo from '../images/logo.png'
import avathar from '../images/avathar.jpg'
// import Avatar from 'material-ui/Avatar';
import Badge from 'material-ui/Badge';
/*import '../containers/headerContainer/index';*/

/**
  Defined header
*/
class Header extends Component {

  toggleNav = (event) => {
    var nav = document.querySelector('.navbar-ex1-collapse');
    nav.classList.toggle('in');
  };

  /**
   * function which render the user name, greetings and message count of pending approvals
   * in header menu if the user is logged in.
   */
  user = () => {
    if (this.props && this.props.userInfo) {
      return <div className="user-name">
        <Badge
          badgeContent={this.props.userInfo.notificationCount}
          secondary={true}
          badgeStyle={{top: 12, right: 10, background:'blue',shape:'rectangle'}}>
          Hello, {this.props.userInfo.user.firstname}
          <img className="avathar" src={avathar} alt="avathar" />
        </Badge>
      </div>
    }
  };

  render() {
    return (
      <nav className="navbar navbar-fixed-top ">
        {/* <!-- Brand and toggle get grouped for better mobile display --> */}
        <div className="navbar-header">
          <img className="logo" src={logo} alt="Logo" />
          <h1 className="brand-title">The Hub</h1>
          {this.user()}
        </div>
      </nav>
    );
  }
}

export default Header;
