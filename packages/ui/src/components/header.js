import React, { Component } from "react";

import { Link } from "react-router-dom";
import "../css/header.css";
import logo from "../images/newhublogo.png";
import avatar from "../images/man-user.png";
import Badge from "material-ui/Badge";
import Avatar from "material-ui/Avatar";
import Chip from "material-ui/Chip";
import FontIcon from "material-ui/FontIcon";
import SvgIconFace from "material-ui/svg-icons/action/face";
import { blue300, indigo900 } from "material-ui/styles/colors";

/**
  Defined header
*/
class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dashboardContent: true,
      eventContent: false,
      initiativeContent: false,
      attendanceContent: false,
      logoutContent: false
    };
  }

  toggleNav = event => {
    var nav = document.querySelector(".navbar-ex1-collapse");
    nav.classList.toggle("in");
  };

  /**
   * Badge message count function displays, the pending events / initiatives
   * approvals count on top the user avatar.
   */
  badgemessagecount = () => {
    return (
      <span className="avatar-container">
        <Badge
          badgeContent={
            <Link to="/viewapprovals">
              {this.props.userInfo.notificationCount}
            </Link>
          }
          secondary={true}
          className="badge-msg"
        />
        <Chip className="avatar-details">
          <Avatar src={avatar} />
          {this.props.userInfo.user.firstname}
        </Chip>
      </span>
    );
  };

  logout = () => {
    this.props.resetStore();
  };

  menuItemClicked = menuItem => {
    switch (menuItem) {
      case "menu1":
        return this.setState({
          dashboardContent: true,
          eventContent: false,
          initiativeContent: false,
          attendanceContent: false,
          logoutContent: false
        });
      case "menu2":
        return this.setState({
          dashboardContent: false,
          eventContent: true,
          initiativeContent: false,
          attendanceContent: false,
          logoutContent: false
        });
      case "menu3":
        return this.setState({
          dashboardContent: false,
          eventContent: false,
          initiativeContent: true,
          attendanceContent: false,
          logoutContent: false
        });
      case "menu4":
        return this.setState({
          dashboardContent: false,
          eventContent: false,
          initiativeContent: false,
          attendanceContent: true,
          logoutContent: false
        });
      case "menu5":
        return this.setState({
          dashboardContent: false,
          eventContent: false,
          initiativeContent: false,
          attendanceContent: false,
          logoutContent: true
        });
        this.logout;
      default:
        return null;
    }
  };

  /**
   * function which render the user name, greetings and message count of pending approvals
   * in header menu if the user is logged in.
   */
  user = () => {
    if (this.props && this.props.userInfo && this.props.userInfo.user) {
      return (
        <div className="header-menu-bar">
          <div>
            <a
              href="/"
              className={
                this.state.dashboardContent
                  ? "header-menu-item selected-menu-item"
                  : "header-menu-item "
              }
              onClick={() => {
                this.menuItemClicked("menu1");
              }}
            >
              DASHBOARD
            </a>

            <a
              className={
                this.state.eventContent
                  ? "header-menu-item selected-menu-item"
                  : "header-menu-item "
              }
              onClick={() => this.menuItemClicked("menu2")}
            >
              EVENTS
            </a>

            <a
              className={
                this.state.initiativeContent
                  ? "header-menu-item selected-menu-item"
                  : "header-menu-item "
              }
              onClick={() => this.menuItemClicked("menu3")}
            >
              INITIATIVES
            </a>

            <a
              className={
                this.state.attendanceContent
                  ? "header-menu-item selected-menu-item"
                  : "header-menu-item "
              }
              onClick={() => this.menuItemClicked("menu4")}
            >
              ATTENDANCE
            </a>

            <a
              className={
                this.state.logoutContent
                  ? "header-menu-item selected-menu-item"
                  : "header-menu-item "
              }
              onClick={() => {
                this.menuItemClicked("menu5");
              }}
            >
              LOGOUT
            </a>
            <span>
              {this.props.userInfo.notificationCount >= 1 ? (
                this.badgemessagecount()
              ) : (
                <Chip>
                  <Avatar src={avatar} />
                  {this.props.userInfo.user.firstname}
                </Chip>
              )}
            </span>

            {/*<div className="user-name">
           {this.props.userInfo.notificationCount >=1 ?
             this.badgemessagecount()
           :
            <div> Hello, {this.props.userInfo.user.firstname}
              <img className="avatar" src={avatar} alt="avatar" /> </div>}
            </div>*/}
          </div>
        </div>
      );
    }
  };

  
  
  render() {
    
    return (
      
      <nav className="navbar navbar-fixed">
        {/* <!-- Brand and toggle get grouped for better mobile display --> */}
        <img className="logo" src={logo} alt="Logo" />
        
        {this.user()}
        
        {this.props && this.props.userInfo && this.props.userInfo.user && 
    
    <div>
      
    {this.state.dashboardContent &&
      <div className="dashboard-menu-content menu-content">
        Welcome, {this.props.userInfo.user.firstname}
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor . Ut enim ad minim veniam, quis nostrud exercitation
          ullamco . Duis aute irure dolor in reprehenderit in voluptate .
        </p>
      </div>
    }
  


    {this.state.eventContent &&
      
      <div className="events-menu-content menu-content">
        <ul className="menu-list-item">
          <li>
            <Link to="/viewevents">View Events</Link>
          </li>
          <li>
            <Link to="/createevent">Create Event</Link>
          </li>
        </ul>
      </div>
    }

      {this.state.initiativeContent && 
      <div className="initiatives-menu-content menu-content">
        <ul className="menu-list-item">
          <li>
            <Link to="/viewinitiative">View initiative</Link>
          </li>
          <li>
            <Link to="/createinitiative">Create initiative</Link>
          </li>
        </ul>
      </div>
      } 
    
  
  </div>
        }       
      </nav>
    );
  }
}

export default Header;
