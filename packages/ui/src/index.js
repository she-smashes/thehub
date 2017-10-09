import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './index.css';
import App from './components/app';
import registerServiceWorker from './registerServiceWorker';

injectTapEventPlugin();

ReactDOM.render(
<MuiThemeProvider>
    <App />
</MuiThemeProvider>, document.getElementById('root'));
registerServiceWorker();
