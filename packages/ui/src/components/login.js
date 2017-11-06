/**
 * @author Ragasudha Aradhyula
 * @name Login
 * @desc This component renders the login page
 */
 import React, {Component} from 'react';
 import LoginForm from './loginForm.js';
 import { Route } from 'react-router-dom';
 import History from '../history';
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
       response: ''
     };
   }

   handleValidation = () => {
       let fields = this.state.user;
       let errors = {};
       let formIsValid = true;

       if(!fields["username"]){
          formIsValid = false;
          errors["username"] = "Enter username";
       }
       if(!fields["password"]){
          formIsValid = false;
          errors["password"] = "Enter password";
       }

      this.setState({errors: errors});
      return formIsValid;
  }
  componentWillReceiveProps = (nextProps) => {
    this.setState({
      response: nextProps.user
    });
  }
   /**
    * Process the form.
    *
    * @param {object} event - the JavaScript event object
    */
   processForm = (event) => {
     // prevent default action. in this case, action is the form submission event
     event.preventDefault();
     if(this.handleValidation()){
       this.props.getUserInfo();
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

   /**
    * Render the component.
    */
   render = () => {

     return (
       <LoginForm
         onSubmit={this.processForm}
         onChange={this.changeUser}
         errors={this.state.errors}
         user={this.state.user}
       />
     );
   }

 }

 export default LoginWidget;
