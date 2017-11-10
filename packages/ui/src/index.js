import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import ReduxPromise from 'redux-promise';

import './index.css';
// Components
import App from './components/app';

// Reducers
import userInfo from './containers/loginFormContainer/reducer';
import eventsList from './containers/eventTimelineContainer/reducer';
import viewInitiatives from './containers/viewInitiativeContainer/reducer';
import registerServiceWorker from './registerServiceWorker';


// root reducer configuration
const rootReducer = combineReducers({
    userInfo,
    eventsList,
    viewInitiatives
});

const store = createStore(
    rootReducer,
    {}, // initial state
    compose(
      applyMiddleware( ReduxPromise),
      // added for redux dev tools extension
      (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
    )
);

injectTapEventPlugin();

ReactDOM.render(
    <Provider  store={store}>
        <MuiThemeProvider>
            <App/>
        </MuiThemeProvider>
    </Provider>
, document.getElementById('root'));
registerServiceWorker();
