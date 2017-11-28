import React, { Component } from 'react';
import {Router, Route, Switch} from 'react-router-dom';

import History from '../history';
// import PageNotFound from './404';
import asyncComponent from './asyncComponent';
import Header from '../containers/headerContainer/index';
import NavigationWidget from './navigationWidget'
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
const AsyncCreateinitiative = asyncComponent(() => import('../containers/createInitiativeContainer/index'));
const AsyncCreateEvent = asyncComponent(() => import('../containers/createEventContainer/index'));
const AsyncViewApprovals = asyncComponent(() => import('../containers/viewApprovalContainer/index'));
const AsyncViewEvents = asyncComponent(() => import('../containers/viewEventsContainer/index'));


class App extends Component {
  render() {
    return (
      <div className="container">
        <Router history={History}>
        <div>
        <Header/>
          <NavigationWidget />
          <Switch>
            <Route path='/login' exact={true} component={AsyncLogin} />
            <Route path='/dashboard' exact={true} component={AsyncDashboard} />
      			<Route path='/eventdetails/:id' exact={true} component = {AsyncEvent} />
      			<Route path='/viewinitiative' exact={true} component = {AsyncViewInitiative} />
            <Route path='/createinitiative' exact={true} component={AsyncCreateinitiative} />
            <Route path='/viewapprovals' exact={true} component={AsyncViewApprovals} />
            <Route path='/viewevents' exact={true} component={AsyncViewEvents} />
            <Route component={AsyncLogin}/>
    		</Switch>
        <Footer />
        </div>
      </Router>
      </div>
    );
  }
}

export default App;
