import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import promise from "redux-promise";
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import { PersistGate } from 'redux-persist/es/integration/react';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';


import './index.css';
// Components
import App from './components/app';

// Reducers
import userInfo from './containers/loginFormContainer/reducer';
import eventsList from './containers/eventTimelineContainer/reducer';
import viewInitiatives from './containers/viewInitiativeContainer/reducer';
import newInitiative from './containers/createInitiativeContainer/reducer';
import viewTasks from './containers/viewApprovalContainer/reducer';
import eventDetails from './containers/eventDetailsContainer/reducer';
import viewEvents from './containers/viewEventsContainer/reducer';
import createEvent from './containers/createEventContainer/reducer';
import approvedInitiatives from './containers/createEventContainer/reducer';
import categories from './containers/createEventContainer/reducer';
import verifyUser from './containers/createEventContainer/reducer';
import registerServiceWorker from './registerServiceWorker';


// Persist only userInfo to the localstorage
const config = {
    key: 'primary',
    storage,
    whitelist: ['userInfo']
}

// root reducer configuration
const rootReducer = persistCombineReducers(config, {
    userInfo,
    eventsList,
    viewInitiatives,
    newInitiative,
    viewTasks,
	  eventDetails,
    viewEvents,
	  approvedInitiatives,
    categories,
    verifyUser
});


// Create persistor and store for storage and state
const { persistor, store } = configureStore()


function configureStore() {

    let store = createStore(rootReducer,
        {}, // initial state
        compose(
            applyMiddleware(promise, thunk, createLogger({
                predicate: (getState, action) => false
            })),
            //            applyMiddleware(promise(),  thunk, createLogger()),
            // added for redux dev tools extension
            (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
        ))
    let persistor = persistStore(store, undefined, () => {
        store.getState()
    }
    );
    return { persistor, store }
}


injectTapEventPlugin();

ReactDOM.render(


    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <MuiThemeProvider>
                <App />
            </MuiThemeProvider>
        </PersistGate>
    </Provider>



    , document.getElementById('root'));
registerServiceWorker();
