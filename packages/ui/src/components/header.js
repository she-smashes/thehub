import React, { Component } from 'react';

import {Link} from 'react-router-dom';
import '../css/header.css'
import {LogoUrl, AvatarUrl} from '../constants/links.js'
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
        <img class="header-user-profile-pic header-project-image" src={AvatarUrl}/>
    </Badge>
  }

  /**
   * function which render the user name, greetings and message count of pending approvals
   * in header menu if the user is logged in.
   */
  user = () => {
    if (this.props && this.props.userInfo && this.props.userInfo.user) {
      return <div class="header-project-userinfo-container">
      <span class="header-project-hello header-project-user-info-text">Hello,</span>
      <span class="header-project-user-name header-project-user-info-text">{this.props.userInfo.user.firstname}</span>
       {this.props.userInfo.notificationCount <=1 ?
         this.badgemessagecount()
       : <img class="header-user-profile-pic header-project-image" src={AvatarUrl}/>}
         </div>
    }
  };

  render() {
    return (<header className="project-hub-header">
        {/* <!-- Brand and toggle get grouped for better mobile display --> */}
        <div class="header-project-title-container">
          <img class="project-hub-logo header-project-image" src={LogoUrl} alt="Logo" />
          <span class="header-project-title">THE HUB</span>
        </div>
        {this.user()}
      </header>
    );
  }
}

export default Header;
