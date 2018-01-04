import React, { Component } from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import Login from '../containers/loginFormContainer/index'
import History from '../history';
import PageNotFound from './404';
import asyncComponent from './asyncComponent';
import Header from '../containers/headerContainer/index';
import NavigationContainer from '../containers/navigationContainer/'
import Footer from './footer';
import '../css/bootstrap/dist/css/bootstrap.min.css';
import '../css/app.css';
import '../css/global.css';
import '../css/singles.css';
import '../css/layout.css';
import '../css/login.css';

const AsyncLogin = asyncComponent(() => import('../containers/loginFormContainer/index'));
const AsyncDashboard = asyncComponent(() => import('./dashboard'));
const AsyncEvent = asyncComponent(() => import('../containers/eventDetailsContainer/index'));
const AsyncViewInitiative = asyncComponent(() => import('../containers/viewInitiativeContainer/index'));
const AsyncInitiative = asyncComponent(() => import('../containers/initiativeDetailsContainer/index'));
const AsyncCreateinitiative = asyncComponent(() => import('../containers/createInitiativeContainer/index'));
const AsyncCreateEvent = asyncComponent(() => import('../containers/createEventContainer/index'));
const AsyncViewApprovals = asyncComponent(() => import('../containers/viewApprovalContainer/index'));
const AsyncViewEvents = asyncComponent(() => import('../containers/viewEventsContainer/index'));
const AsyncViewAllBadges = asyncComponent(() => import('../containers/viewAllBadgesContainer/index'));
const AsyncViewAllBadgesToBeClaimed = asyncComponent(() => import('../containers/ViewAllBadgesToBeClaimedContainer/index'));
const AsyncUploadAttendance = asyncComponent(() => import('../containers/uploadAttendanceContainer/index'));


class App extends Component {
  render() {
    const loggedIn = (this.props.userInfo && this.props.userInfo.user) ? true : false;
    return (
      <div className="container">
        <Router history={History}>
        <div>
          <Header/>
        {
          !loggedIn? <Login />:
          <div>            
            <NavigationContainer />
            <Switch>
              <Route path='/' exact={true} component={AsyncDashboard} />
              <Route path='/eventdetails/:id' exact={true} component = {AsyncEvent} />
              <Route path='/viewinitiative' exact={true} component = {AsyncViewInitiative} />
              <Route path='/initiativedetails/:id' exact={true} component = {AsyncInitiative} />
              <Route path='/createinitiative' exact={true} component={AsyncCreateinitiative} />
              <Route path='/createevent' exact={true} component={AsyncCreateEvent} />
              <Route path='/viewapprovals' exact={true} component={AsyncViewApprovals} />
              <Route path='/viewevents' exact={true} component={AsyncViewEvents} />
              <Route path='/viewallbadges' exact={true} component={AsyncViewAllBadges} />
              <Route path='/viewallbadgestobeclaimed' exact={true} component={AsyncViewAllBadgesToBeClaimed} />
              <Route path='/uploadattendance/:id' exact={true} component = {AsyncUploadAttendance} />
              <Route component={PageNotFound}/>
            </Switch>
          </div>
        }

        <Footer />
        </div>
      </Router>
      </div>
    );
  }
}

export default App;
