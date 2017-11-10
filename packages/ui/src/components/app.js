import React, { Component } from 'react';
import {Router, Route, Switch} from 'react-router-dom';

import History from '../history';
import PageNotFound from './404';
import asyncComponent from './asyncComponent';
import Header from './header'
import '../css/app.css';

const AsyncLogin = asyncComponent(() => import('../containers/loginFormContainer/index'));
const AsyncDashboard = asyncComponent(() => import('./dashboard'));
const AsyncEvent = asyncComponent(() => import('../containers/eventDetailsContainer/index'));

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Router history={History}>
          <Switch>
            <Route path='/login' exact={true} component={AsyncLogin} />
            <Route path='/dashboard' exact={true} component={AsyncDashboard} />
            <Route path='/eventdetails/:id' exact={true} component = {AsyncEvent} />
            <Route component={PageNotFound}/>
          </Switch>
        </Router>
      </div>

    );
  }
}

export default App;
