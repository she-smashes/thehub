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

import './index.css';
// Components
import App from './containers/appContainer/';

// Reducers
import userInfo from './containers/loginFormContainer/reducer';
import eventsList from './containers/eventTimelineContainer/reducer';
import viewInitiatives from './containers/viewInitiativeContainer/reducer';
import badgesList from './containers/badgesContainer/reducer';
import viewTasks from './containers/viewApprovalContainer/reducer';
import allBadgesList from './containers/viewAllBadgesContainer/reducer';
import eventDetails from './containers/eventDetailsContainer/reducer';
import eventEnrollmentsDetails from './containers/eventDetailsContainer/enrollmentsReducer';
import progressCategoriesList from './containers/progressCategoriesContainer/reducer';
import initiativeDetails from './containers/initiativeDetailsContainer/reducer';
import viewEvents from './containers/viewEventsContainer/reducer';
import createEvent from './containers/createEventContainer/reducer';
import approvedInitiatives from './containers/createEventContainer/getInitReducer';
import categories from './containers/createEventContainer/categoriesReducer';
import participants from './containers/createEventContainer/participantsReducer';
import badgesToBeClaimedList from './containers/ViewAllBadgesToBeClaimedContainer/reducer';
import badgesCanBeClaimedList from './containers/claimYourBadgeContainer/reducer';
import eventData from './containers/uploadAttendanceContainer/reducer';
import attendanceInfo from './containers/attendanceContainer/reducer';


import { reducer as reduxFormReducer } from 'redux-form';

import registerServiceWorker from './registerServiceWorker';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

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
    viewTasks,
    eventDetails,
    eventEnrollmentsDetails,
    viewEvents,
    approvedInitiatives,
    categories,
    participants,
    initiativeDetails,
    badgesList,
    allBadgesList,
    progressCategoriesList,
    badgesToBeClaimedList,
    badgesCanBeClaimedList,
    eventData,
    attendanceInfo
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

// Commenting this line to make the Loopback API Explorer work
registerServiceWorker();
