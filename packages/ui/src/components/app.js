import React, { Component } from 'react';
import {Router, Route, Switch} from 'react-router-dom';

import History from '../history';
import PageNotFound from './404';
import asyncComponent from './asyncComponent';
import '../css/app.css';


const AsyncLogin = asyncComponent(() => import('./login'));
const AsyncDashboard = asyncComponent(() => import('./dashboard'));

class App extends Component {
  render() {
    return (
      <Router history={History}>
        <Switch>
          <Route path='/login' exact={true} component={AsyncLogin} />
          <Route path='/' exact={true} component={AsyncDashboard} />
          <Route component={PageNotFound}/>
        </Switch>
      </Router>
    );
  }
}

export default App;