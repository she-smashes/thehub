/**
 * @author Ragasudha Aradhyula
 * @name Login
 * @desc This component renders the login page
 */
 import React, {Component} from 'react';
 import LoginForm from './loginForm.js';

 import {Router, Route, Switch} from 'react-router-dom';

 import asyncComponent from './asyncComponent';

 const AsyncDashboard = asyncComponent(() => import('./dashboard'));
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
       }
     };
   }
   componentDidMount =  () => {
       this.props.getUserInfo();
       console.log(this.props.username+"Sudha");
   }
   handleValidation =  () => {
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
   /**
    * Process the form.
    *
    * @param {object} event - the JavaScript event object
    */
   processForm =  ()  => {
     // prevent default action. in this case, action is the form submission event
     if(this.handleValidation()){
       /*return this.props.username.map((event, index) => {
         return
           <Router history={History}>
             <Switch>
               <Route path='/' exact={true} component={AsyncDashboard} />
             </Switch>
           </Router>

       })*/
       console.log(this.props);
       console.log('username:', this.state.user.username);
       console.log('password:', this.state.user.password);
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
     console.log(JSON.stringify(this.props) + "this.props");
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
