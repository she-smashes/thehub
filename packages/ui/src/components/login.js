/**
 * @author Ragasudha Aradhyula
 * @name Login
 * @desc This component renders the login page
 */
import React, { Component } from 'react';
import { Card } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import History from '../history';
import CircularProgress from 'material-ui/CircularProgress';
import { INVALID_LOGIN } from "../constants/actions";
import '../css/login.css';
import cookie from 'react-cookies'
import axios from 'axios';

class LoginWidget extends Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);
    // set the initial component state
    this.state = {
      errors: {},
      user: {
        username: '',
        password: ''
      },
      response: '',
      open: false,
      isLoading: false
    };
  }
  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  resetForm = () => {
    this.setState({
      user: {
        username: '',
        password: ''
      }
    });
  }
  handleValidation = () => {
    let fields = this.state.user;
    let errors = {};
    let formIsValid = true;

    if (!fields["username"]) {
      formIsValid = false;
      errors["username"] = "Enter username";
    }
    if (!fields["password"]) {
      formIsValid = false;
      errors["password"] = "Enter password";
    }

    this.setState({ errors: errors });
    return formIsValid;
  }
  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm = (event) => {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();
    this.setState({ isLoading: true });
    if (this.handleValidation()) {
      this.props.loginUser(this.state.user)
        .then((response, error) => {
          // You get the logged in response here
          this.setState({ isLoading: false });
          this.props.updateUserInfo(JSON.parse(response.data));
          History.push("/");

        }, (error) => {
          this.setState({ isLoading: false });
          console.log('error', error);
          this.handleOpen();
          this.resetForm();
        });
    }
  }
  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser = (event) => {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  };
  showCustomLogin = (event) => {
    const actions = [
      <FlatButton
        label="OK"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />,
    ];

   return (
    <Card className="container login-page">
      <form onSubmit={this.processForm}>

        <h2 className="card-heading">Sign In</h2>
        <CircularProgress className={
          this.state.isLoading ? 'show' : 'load-notify'
        } />

        <div className="field-line">
          <TextField
            floatingLabelText="Username"
            name="username"
            onChange={this.changeUser}
            value={this.state.user.username}
            className="align-left"
            errorText={this.state.errors.username}
          />
        </div>

        <div className="field-line">
          <TextField
            floatingLabelText="Password"
            type="password"
            name="password"
            onChange={this.changeUser}
            value={this.state.user.password}
            className="align-left"
            errorText={this.state.errors.password}
          />
        </div>
       
          <div className="button-line">
            <RaisedButton type="submit" label="Login" primary />
          </div>
        
      </form>
      <Dialog
        title="Message"
        className="dialog-ui"
        actions={actions}
        modal={false}
        open={this.state.open}
        onRequestClose={this.handleClose}
      >
        {INVALID_LOGIN}
      </Dialog>
    </Card>

  );
  };
  
  showLoginButtonOnly = (event) => {
    var authURL = process.env.customLogin;
    return (
     <Card className="container login-page">
           <div className="button-line">
             <RaisedButton type="button" label="Login" primary href={authURL} />
           </div>

     </Card> 
   );
   };


  /**
   * Render the component.
   */
  render = () => {
    if (process.env.customLogin === 'true') {
      return this.showCustomLogin();
    } else {
      var cookieToken;
      if(cookie !== undefined) {
        cookieToken = cookie.load('user_token');
        if (cookieToken) {
          this.setState({ isLoading: true });
          this.props.getUserAuthDetails(cookieToken, process.env.REACT_APP_USER_AUTH_URL)
          .then((response1, error) => {           
            var user = {
              username: response1.payload.data.name,
              password: response1.payload.data.name,
            };
            this.props.loginUser(user)
              .then((response, error) => {
                this.setState({ isLoading: false });
                var userInfoData = JSON.parse(response.data);
                userInfoData.thirdPartyUserDetails = response1.payload.data;
                this.props.updateUserInfo(userInfoData);
                document.location.href = document.location.href;
                History.push("/");
              }, (error) => {
                this.setState({ isLoading: false });
                console.log('error', error);
              });
          }, (error) => {
            this.setState({ isLoading: false });
            console.log('error', error);
          });
        } else {
          return this.showLoginButtonOnly();         
        }
      }
       else {
        return this.showLoginButtonOnly();
      }
    }
  }

}

export default LoginWidget;
