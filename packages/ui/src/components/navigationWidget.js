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

import CreateinitiativeWidget from '../containers/createInitiativeContainer/index';
import CreateEventWidget from '../containers/createEventContainer/index';

import '../css/header.css'

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

 handleChange = (event, index, value) => this.setState({value});
  render = () => {
    return (
      <div className="menu-bar">
      <Toolbar>
        <ToolbarGroup>
          <ToolbarTitle text="Dashboard" />
          <ToolbarSeparator className="margin-30" />
          <ToolbarTitle text="Events" />
          <IconMenu
            iconButtonElement={
              <IconButton touch={true}>
                <NavigationExpandMoreIcon />
              </IconButton>
            }
          >
          <MenuItem primaryText="Create Events" />
          <MenuItem primaryText="View Events" />
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
            <MenuItem primaryText="Create Initiative" />
            <MenuItem primaryText="View Initiatives" />
          </IconMenu>
          <ToolbarSeparator  className="margin-30"/>
          <ToolbarTitle text="Gallery" />
          <ToolbarSeparator className="margin-30" />
          <RaisedButton className="logout" label="Logout" primary={true} />
        </ToolbarGroup>
      </Toolbar>
      </div>
    );
  }
}

export default NavigationWidget;
