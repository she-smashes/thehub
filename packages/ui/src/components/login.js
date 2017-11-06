/**
 * @author Ragasudha Aradhyula
 * @name Login
 * @desc This component renders the login page
 */
 import React, {Component} from 'react';
 import { Card } from 'material-ui/Card';
 import RaisedButton from 'material-ui/RaisedButton';
 import TextField from 'material-ui/TextField';
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
      this.props.getUserInfo(this.state.user)
      .then((response) => {
        // You get the logged in response here
        console.log(response);
        History.push("/dashboard")

      })
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
       <Card className="container login-page">
       <form onSubmit={this.processForm}>
           <h2 className="card-heading">Login</h2>
     
           {this.state.errors.summary && <p className="error-message">{this.state.errors.summary}</p>}
     
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
             <RaisedButton type="submit" label="Log in" primary />
           </div>
         </form>
       </Card>
     );
   }

 }

 export default LoginWidget;
