/**
 * @author Ragasudha Aradhyula
 * @name Create Event
 * @desc This component renders the create event form page
 */
import React, { Component} from 'react';
import { Card } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import { Route } from 'react-router-dom';
import History from '../history';

const items = [
  <MenuItem key={1} value={1} primaryText="1-5" />,
  <MenuItem key={2} value={2} primaryText="6-10" />,
  <MenuItem key={3} value={3} primaryText="11-15" />,
  <MenuItem key={4} value={4} primaryText="16-25" />,
  <MenuItem key={5} value={5} primaryText="26-35" />,
];

class CreateEvent extends Component {
    /**
     * Class constructor.
     */
    constructor(props) {
        super(props);

        // set the initial component state

        this.state = {
            errors: {},
            createEventformData: {
                title: '',
                description: '',
                initiativeName: '',
                eventOwner: '',
                eventStartDate:'',
                eventEndDate:'',
                location: '',
                category: '',
                timeSpan: '',
                participantType: ''
            },

        };

    }
    /**
     * Function to validate the form
     *
     */
    handleValidation=()=> {
        let fields = this.state.createEventformData;
        let errors = {};
        let formIsValid = true;
        console.log(this.state.createEventformData.intiativeEndDate);

        if (!fields["initiativeName"]) {
            formIsValid = false;
            errors["initiativeName"] = "Enter Initiative Name";
        }
        if (!fields["title"]) {
            formIsValid = false;
            errors["title"] = "Enter title";
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
        if (this.handleValidation()) {
            this.props.sendInitiativeDetails(this.state.createEventformData,this.props.userInfo)
            .then((response,error) =>{
                alert('Initiative Created!!!')
            },(error)=>{
                alert('Error'+error);
            });
        }
    }

    /**
     * Change the user object.
     *
     * @param {object} event - the JavaScript event object
     */
    changeUser=(event)=> {
        const field = event.target.name;
        const user = this.state.createEventformData;
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
    /**
     * Function to set the value into the state for participant drop down
     *
    */
    onParticipantDropDownChange=(event,index,value)=>{
        this.setState({
            createEventformData : {...this.state.createEventformData, totalParticipants: value}
        });
    };
    /**
     * Function to set the value into the state for initiative start date
     *
    */
    handleStartDateChange=(event,date)=>{
        this.setState({
            createEventformData : {...this.state.createEventformData, eventStartDate: date}
        });
    };
    /**
     * Function to set the value into the state for initiative end date
     *
    */
    handleEndDateChange=(event,date)=>{
        this.setState({
            createEventformData : {...this.state.createEventformData, eventEndDate: date}
        });
    };

    /**
     * Render the component.
     */
    render=()=> {
        return (
           <div className="container  App">
                <form onSubmit={this.processForm}>
                    <h2 className="card-heading">Create Event</h2>
                    <div className="field-line">
                        <TextField floatingLabelText="Title" className="align-left" name="title" onChange={this.changeUser} value={this.state.createEventformData.title} errorText={this.state.errors.title} />
                    </div>
                    <div className="field-line">
                        <TextField floatingLabelText="Description" className="align-left" name="description" onChange={this.changeUser} value={this.state.createEventformData.description} errorText={this.state.errors.description} />
                    </div>
                    <div>
                    <SelectField  className="align-left" name="initiativeName" value={this.state.createEventformData.initiativeName} onChange={(event, index, value)=> this.onParticipantDropDownChange(event, index, value)} autoWidth={true} floatingLabelText="Select Initiative">
                        {items}
                    </SelectField>
                    </div>
                    <div>
                        <DatePicker hintText="Initiative start date" name="initiativeStartDate" onChange={(event, date)=>this.handleStartDateChange(event,date)} shouldDisableDate={this.pastDateCheck(new Date())}/>
                    </div>
                    <div>
                        <DatePicker hintText="Initiative end date" name="initiativeEndDate" onChange={(event, date)=>this.handleEndDateChange(event,date)} shouldDisableDate={this.pastDateCheck(new Date())} />
                    </div>
                    <div className="field-line">
                        <TextField floatingLabelText="Location" className="align-left" name="location" onChange={this.changeUser} value={this.state.createEventformData.location} errorText={this.state.errors.location} />
                    </div>
                    <div className="select-radio">
                    <RadioButtonGroup name="duration" defaultSelected="hourly">
                      <RadioButton
                        value="hourly"
                        label="Hourly"
                      />
                      <RadioButton
                        value="non-hourly"
                        label="Non-Hourly"
                      />
                    </RadioButtonGroup>
                    </div>
                    <div className="button-line">
                        <RaisedButton type="submit" label="Submit" primary />
                    </div>
                </form>
            </div>
        );
    }
}

export default CreateEvent;
