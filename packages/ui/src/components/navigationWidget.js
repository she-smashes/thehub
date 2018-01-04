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
      <div className="navbar navbar-inverse navbar-hub">
      <Toolbar style={{background:"#222d33", height:"45px", "fontSize":"14px", "paddingLeft":"200px"}}>
        <ToolbarGroup>
          <ToolbarTitle  text={
            <Link className="navbar-menu-listitem" to={`/`}> Dashboard</Link>
          } />
          <ToolbarSeparator className="margin-30" />
          <ToolbarTitle style={{color:"#fff", "fontSize":"14px"}} text="Events" />
          <IconMenu style={{background:"#222d33"}}
            iconButtonElement={
              <IconButton touch={true}>
                <NavigationExpandMoreIcon  />
              </IconButton>
            }
          >
          <MenuItem primaryText={
            <Link  style={{color:"#000", "fontSize":"14px"}} className="navbar-menu-listitem"  to={`/createevent`}> Create Event</Link>
          } />
          <MenuItem primaryText={
            <Link  style={{color:"#000", "fontSize":"14px"}} to={`/viewevents`}> View Events</Link>
          } />
          </IconMenu>
          <ToolbarSeparator className="margin-30" />
          <ToolbarTitle  style={{color:"#fff", "fontSize":"14px"}} text="Initiatives" />
          <IconMenu
            iconButtonElement={
              <IconButton touch={true}>
                <NavigationExpandMoreIcon style={{background:"#222d33"}} />
              </IconButton>}

          >
            <MenuItem primaryText={
              <Link  style={{color:"#000" , "fontSize":"14px"}} to={`/createinitiative`}> Create Initiative</Link>
            } />
            <MenuItem primaryText={
              <Link  style={{color:"#000", "fontSize":"14px"}} to={`/viewinitiative`}> View Initiatives</Link>
            } />

          </IconMenu>
          <ToolbarSeparator  className="margin-30"/>
          <ToolbarTitle  style={{color:"#fff", "fontSize":"14px"}} text="Gallery" />
          <ToolbarSeparator className="margin-30" />
          <RaisedButton className="logout" label="Logout" onClick={this.logout} primary={true} />
        </ToolbarGroup>
      </Toolbar>
      </div>
    );
  }
}

export default NavigationWidget;
