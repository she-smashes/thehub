/**
 * @author Sandhya Salian
 * @name Create Initiative
 * @desc This component renders the create initiative page
 */
import React from 'react';
import CreateInitiativeForm from './createInitiativeForm.js';

class CreateInitiative extends React.Component {

    /**
     * Class constructor.
     */
    constructor(props) {
        super(props);

        // set the initial component state

        this.state = {
            errors: {},
            user: {
                initiativeName: '',
                approverName: ''
            },
            totalParticipants: {}
        };

        this.processForm = this.processForm.bind(this);
        this.changeUser = this.changeUser.bind(this);

    }
    handleValidation() {
        let fields = this.state.user;
        let errors = {};
        let formIsValid = true;

        if (!fields["initiativeName"]) {
            formIsValid = false;
            errors["initiativeName"] = "Enter Initiative Name";
        }
        if (!fields["approverName"]) {
            formIsValid = false;
            errors["approverName"] = "Enter Approver name";
        }

        this.setState({
            errors: errors
        });
        return formIsValid;
    }


    /**
     * Process the form.
     *
     * @param {object} event - the JavaScript event object
     */
    processForm=(event)=> {
        // prevent default action. in this case, action is the form submission event
        event.preventDefault();
        console.log("submit");
        if (this.handleValidation()) {
            console.log('username:', this.state.user.initiativeName);
            console.log('password:', this.state.user.approverName);
        }
    }

    /**
     * Change the user object.
     *
     * @param {object} event - the JavaScript event object
     */
    changeUser=(event)=> {
        const field = event.target.name;
        const user = this.state.user;
        user[field] = event.target.value;

        this.setState({
            user
        });
    };
    /**
     * Function to validate if the user selects a past date for event dates
     *
     */  
    pastDateCheck=(startDate) =>{
        const startSeconds = Date.parse(startDate);
        return (date) => {
            return Date.parse(date) < startSeconds;
        }
    };


    particpantDropDownChange=(event,index,value)=>{  
    console.log(value);      
        this.setState({
            totalParticipants:value
        });
        console.log(this.state.totalParticipants);
    };

    /**
     * Render the component.
     */
    render() {
        return ( <
            CreateInitiativeForm onSubmit = {
                this.processForm
            }
            onChange = {
                this.changeUser
            }
            pastDateCheck={
                this.pastDateCheck
            }
            errors = {
                this.state.errors
            }
            user = {
                this.state.user
            }
            onParticipantDropDownChange={
                this.particpantDropDownChange
            }
            totalParticipants={
                this.totalParticipants
            }
            />
        );
    }

}

export default CreateInitiative;