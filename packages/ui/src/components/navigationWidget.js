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
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';

import '../css/header.css';

/**
  Defined header
*/

class NavigationWidget extends Component {
  constructor(props) {
   super(props);
   this.showMobileNavigation = this.showMobileNavigation.bind(this);
   this.state = {
     value: 3,
     open:false,
     mobileNestedList:false
   };
 }



  /**
   * @name logout
   * @desc clear local storage and redirects to login page
   */
  logout = () => {
    this.props.resetStore();
  }

  /**
   * Shows the mobile navigation when clicked on the hamburger
   *
   * @param {object} event - the JavaScript event object
   */
  showMobileNavigation = (event) => {
      this.setState({open: !this.state.open});
  };

  handleNestedListToggle = (item) => {
    this.setState({
      open: !item.state.mobileNestedList
    });
  };
  handleClose = () => this.setState({open: false});
  render = () => {
    return (
      <div>
    <div className="menu-bar">
        {/*<Toolbar>
            <ToolbarGroup>
                <ToolbarTitle text={ <Link to={`/`}> Dashboard</Link>
                    } />
                    <ToolbarSeparator className="margin-30" />
                    <ToolbarTitle text="Events" />
                    <IconMenu iconButtonElement={ <IconButton touch={true}>
                        <NavigationExpandMoreIcon />
                        </IconButton>
                        } >
                        <MenuItem className="menu-item" primaryText={ <Link to={`/createevent`}> Create Event</Link>
                        } />
                        <MenuItem className="menu-item" primaryText={ <Link to={`/viewevents`}> View Events</Link>
                        } />
                    </IconMenu>
                    <ToolbarSeparator className="margin-30" />
                    <ToolbarTitle text="Initiatives" />
                    <IconMenu iconButtonElement={ <IconButton touch={true}>
                        <NavigationExpandMoreIcon />
                        </IconButton>
                        } >
                        <MenuItem className="menu-item" primaryText={ <Link to={`/createinitiative`}> Create Initiative</Link>
                        } />
                        <MenuItem className="menu-item" primaryText={ <Link to={`/viewinitiative`}> View Initiatives</Link>
                        } />

                    </IconMenu>
                    <ToolbarSeparator className="margin-30" />
                    <RaisedButton className="logout" label="Logout" onClick={this.logout} primary={true} />
            </ToolbarGroup>
        </Toolbar>*/}
        <div>
        </div>
    </div>
    <div className="mobile-menu-bar">
        <AppBar title="" isInitiallyOpen={ true } onLeftIconButtonTouchTap={ this.showMobileNavigation } />
        <Drawer docked={false} openSecondary={true} open={this.state.open} onRequestChange={(open)=> this.setState({open})} >
            <List>
                <ListItem onClick= {this.handleClose} primaryText={<Link to="/"> Dashboard </Link>} />
                    <ListItem primaryText="Events" primaryTogglesNestedList={true} nestedItems={[ <ListItem key={1} onClick= {this.handleClose} primaryText={<Link to="/createevent">Create Event </Link>} />,
                        <ListItem key={2} onClick= {this.handleClose} primaryText={<Link to="/viewevents">View Events</Link>} /> ]} />
                            <ListItem key={3} primaryText="Initiative" primaryTogglesNestedList={true} nestedItems={[ <ListItem key={1} onClick= {this.handleClose} primaryText={<Link to="/createinitiative">Create Initiative</Link>} />,
                                <ListItem key={2} onClick= {this.handleClose} primaryText={<Link to="/viewinitiative">View Initiative</Link>} /> ]} />
                                    <ListItem onClick= {this.handleClose} primaryText="Logout" onClick={this.logout}/>
            </List>
        </Drawer>
    </div>
</div>
    );
  }
}

export default NavigationWidget;
