import React, { Component } from 'react';
import History from '../history';
import { Link } from 'react-router-dom';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import { Navbar, Nav, NavItem, NavDropdown } from 'react-bootstrap';
import '../css/header.css';

/**
  Defined header
*/

class NavigationWidget extends Component {
  constructor(props) {
   super(props);
   this.state = {
     value: 3,
   };
 }



  /**
   * @name logout
   * @desc clear local storage and redirects to login page
   */
  logout = () => {
    this.props.resetStore();
  }

 handleChange = (event, index, value) => this.setState({value});
  render = () => {
    return (
      <div className="menu-bar">
      <Toolbar>
        <ToolbarGroup>
          <ToolbarTitle text={
            <Link to={`/`}> Dashboard</Link>
          } />
          <ToolbarSeparator className="margin-30" />
          <ToolbarTitle text="Events" />
          <IconMenu
            iconButtonElement={
              <IconButton touch={true}>
                <NavigationExpandMoreIcon />
              </IconButton>
            }
          >
          <MenuItem className="menu-item" primaryText={
            <Link to={`/createevent`}> Create Event</Link>
          } />
          <MenuItem className="menu-item" primaryText={
            <Link to={`/viewevents`}> View Events</Link>
          } />
          </IconMenu>
          <ToolbarSeparator className="margin-30" />
          <ToolbarTitle text="Initiatives" />
          <IconMenu
            iconButtonElement={
              <IconButton touch={true}>
                <NavigationExpandMoreIcon />
              </IconButton>
            }
          >
            <MenuItem className="menu-item" primaryText={
              <Link to={`/createinitiative`}> Create Initiative</Link>
            } />
            <MenuItem className="menu-item" primaryText={
              <Link to={`/viewinitiative`}> View Initiatives</Link>
            } />

          </IconMenu>
          <ToolbarSeparator  className="margin-30"/>
          <ToolbarTitle text="Gallery" />
          <ToolbarSeparator className="margin-30" />
          <RaisedButton className="logout" label="Logout" onClick={this.logout} primary={true} />
        </ToolbarGroup>
      </Toolbar>   

      </div>
    );
  }
}

export default NavigationWidget;
