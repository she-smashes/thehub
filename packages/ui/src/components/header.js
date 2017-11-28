import React, { Component } from 'react';

import {Link} from 'react-router-dom';
import '../css/header.css'
import logo from '../images/logo.png'
import avathar from '../images/avathar.jpg'
import Badge from 'material-ui/Badge';


/**
  Defined header
*/
class Header extends Component {

  toggleNav = (event) => {
    var nav = document.querySelector('.navbar-ex1-collapse');
    nav.classList.toggle('in');
  };

  /**
  * Badge message count function displays, the pending events / initiatives
  * approvals count on top the user avatar.
  */
  badgemessagecount = () => {
    return <Badge
      badgeContent={<Link to="/viewapprovals">{this.props.userInfo.notificationCount}</Link>}
      secondary={true}
      badgeStyle={{top: 12, right: 10, background:'Red'}}>
       Hello, {this.props.userInfo.user.firstname}
      <img className="avathar" src={avathar} alt="avathar" />
    </Badge>
  }

  /**
   * function which render the user name, greetings and message count of pending approvals
   * in header menu if the user is logged in.
   */
  user = () => {
    if(this.props && this.props.userInfo && this.props.userInfo.user) {
      return <div className="user-name">
       {this.props.userInfo.notificationCount >=1 ?
         this.badgemessagecount()
       :
         <div> Hello, {this.props.userInfo.user.firstname}
           <img className="avathar" src={avathar} alt="avathar" /> </div>}
         </div>
    }
  };

  render() {
    return (
      <nav className="navbar navbar-fixed">
        {/* <!-- Brand and toggle get grouped for better mobile display --> */}
          <img className="logo" src={logo} alt="Logo" />
          <h1 className="brand-title">The Hub</h1>
          {this.user()}
      </nav>
    );
  }
}

export default Header;
