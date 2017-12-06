/**
 * @author Ragasudha Aradhyula
 * @name Create Event
 * @desc This component renders the create event form page
 */
import React, { Component} from 'react';
import { Card } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import { Route } from 'react-router-dom';
import History from '../history';
import { INVALID_USER, EVENT_FAILURE } from "../constants/actions";
import Checkbox from 'material-ui/Checkbox';
const styles = {
    block: {
      maxWidth: 250,
    },
    checkbox: {
      marginBottom: 16,
    },
  };

class CreateEvent extends Component {
    /**
     * Class constructor.
     */
    constructor(props) {
        super(props);

        // set the initial component state

        this.state = {
            errors: {},
            disabled: true,
            open: false,
            message: '',
            hourlyList:[],
            nonhourlyList:[],
            createEventformData: {
                title: '',
                description: '',
                initiativeName: '',
                lead: '',
                leadId: '',
                eventStartDate:'',
                eventEndDate:'',
                location: '',
                category: '',
                eventTypeSelected: '',
                participantsSelected: []
            },

        };

    }
    componentDidMount =  () => {
        this.props.getApprovedInitiatives(this.props.userInfo).then((response, error) => {
            this.props.updateApprovedInitiativesList(JSON.parse(response.data));          
        });
        this.props.getCategories(this.props.userInfo).then((response, error) => {
            this.props.updateCategoriesList(JSON.parse(response.data));            
        });
        this.props.getParticipantList(this.props.userInfo).then((response, error) => {
             this.props.updateParticipantsList(JSON.parse(response.data));
             let hList = [];
             let nhList = [];
             this.props.participants.map((event, index) => {
                 if(event.hourly) {
                     hList.push(this.props.participants[index]);
                 } else {
                     nhList.push(this.props.participants[index]);
                 }
             });
             this.setState({
                 nonhourlyList: hList
             });
             this.setState({
                 nonhourlyList: nhList
             });
        });
    }
    /**
     * Function to validate the form
     *
     */
    handleValidation=()=> {
        let fields = this.state.createEventformData;
        let errors = {};
        let formIsValid = true;

        if (!fields["initiativeName"]) {
            formIsValid = false;
            errors["initiativeName"] = "Enter Initiative Name";
        }
        if (!fields["title"]) {
            formIsValid = false;
            errors["title"] = "Enter title";
        }
        if (!fields["lead"]) {
            formIsValid = false;
            errors["lead"] = "Enter Lead name";
        }
        this.setState({
            errors: errors
        });
        return formIsValid;
    }
    handleOpen = () => {
      this.setState({open: true});
    };

    handleClose = () => {
      this.setState({open: false});
    };

    /**
     * Process the form.
     *
     * @param {object} event - the JavaScript event object
     */
    processForm=(event)=> {
        // prevent default action. in this case, action is the form submission event
        event.preventDefault();
        if (this.handleValidation()) {
            this.props.sendEventDetails(this.state.createEventformData,this.props.userInfo)
            .then((response,error) =>{
                History.push("/");
            },(error)=>{
              this.handleOpen();
              this.setState({
                  open: true,
                  message: EVENT_FAILURE
              });
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
     * verify the lead user object.
     *
     * @param {object} event - the JavaScript event object
     */
    verifyLeadUser=(event)=> {
        this.props.verifyUser(this.state.createEventformData.lead,this.props.userInfo)
        .then((response,error) =>{
            if (response.body.length > 0) {
              this.setState(prevState => ({
                  createEventformData: {
                      ...prevState.createEventformData,
                      leadId: JSON.stringify(response.body[0].id)
                  }
              }));
              this.setState({
                  disabled: false,
                  open: false,
                  message: ''
              });
            }
            else{
              this.handleOpen();
              this.setState({
                  disabled: true,
                  open: true,
                  message:INVALID_USER
              });
            }
        },(error)=>{
            alert('Error'+error);
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
     * Function to set the value into the state for Initiative name
     *
    */
    onInitiativeDropDownChange=(event,index,value)=>{
        this.setState({
            createEventformData : {...this.state.createEventformData, initiativeName: value}
        });
    };
    /**
     * Function to set the value into the state for category drop down
     *
    */
    onCategoryDropDownChange=(event,index,value)=>{
        this.setState({
            createEventformData : {...this.state.createEventformData, category: value}
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
     * @name renderInitiatives
     * @desc Iterates through the list of the initiatives and renders the list of initiatives
     * @return Rendered events list {HTML}
     */
    renderInitiatives = () => {
        return this.props.approvedInitiatives.map((event, index) => {
            return <MenuItem key={event.id} value={event.id} primaryText={event.title} />
        });
    }
    /**
     * @name renderCategories
     * @desc Iterates through the list of the categories and renders the list of initiatives
     * @return Rendered events list {HTML}
     */
    renderCategories = () => {
        return this.props.categories.map((event, index) => {
            return <MenuItem key={event.id} value={event.id} primaryText={event.name} />
        });
    }
    handleEventTypeSelection = (event) => {
        this.setState({
            eventTypeSelected: event.target.value
        });
        this.setState(prevState => ({
            createEventformData: {
                ...prevState.createEventformData,
                participantsSelected: []
            }
        }));
    }
    saveParticipantSelection = (event, checked) => {
        let participantSelections = [];
        if(this.state.createEventformData.participantsSelected != undefined) {
            participantSelections = participantSelections.concat(this.state.createEventformData.participantsSelected);
        }
        if(checked) {
            participantSelections.push(event.target.value);
        } else {
            participantSelections = participantSelections.splice(participantSelections.indexOf(event.target.value), 1);
        }
        this.setState(prevState => ({
            createEventformData: {
                ...prevState.createEventformData,
                participantsSelected: participantSelections
            }
        }));
    }
    handleHourlyParticipantsDisplay = () => {
        return this.state.hourlyList.map((event, index) => {
            return  <Checkbox key={event.id} value={event.id} label={event.participantType} className="align-left" onCheck={this.saveParticipantSelection} />
        });
    }
    handleNonHourlyParticipantsDisplay = () => {
        return this.state.nonhourlyList.map((event, index) => {
            return  <Checkbox key={event.id} value={event.id} label={event.participantType} className="align-left" onCheck={this.saveParticipantSelection}/>
        });
    }
    /**
     * Render the component.
     */
    render=()=> {
      const actions = [
        <FlatButton
          label="OK"
          primary={true}
          keyboardFocused={true}
          onClick={this.handleClose}
        />,
      ];
        return (
           <div className="container  App">
                <form onSubmit={this.processForm}>
                    <h2 className="card-heading">Create Event</h2>
                    <div className="field-line">
                        <TextField floatingLabelText="Lead Name" className="align-left" name="lead" onChange={this.changeUser} onBlur={this.verifyLeadUser} value={this.state.createEventformData.lead} errorText={this.state.errors.lead} />
                    </div>
                    <div className="field-line">
                        <TextField floatingLabelText="Title" className="align-left" name="title" onChange={this.changeUser} value={this.state.createEventformData.title} errorText={this.state.errors.title} />
                    </div>
                    <div className="field-line">
                        <TextField floatingLabelText="Description" className="align-left" name="description" onChange={this.changeUser} value={this.state.createEventformData.description} errorText={this.state.errors.description} />
                    </div>
                    <div>
                    <SelectField className="align-left" name="initiativeName" value={this.state.createEventformData.initiativeName} onChange={(event, index, value)=> this.onInitiativeDropDownChange(event, index, value)} autoWidth={true} floatingLabelText="Select Initiative">
                     {this.props.approvedInitiatives.length>0?this.renderInitiatives():<div></div>}
                    </SelectField>
                    </div>
                    <div>
                        <DatePicker hintText="Event start date" name="eventStartDate" onChange={(event, date)=>this.handleStartDateChange(event,date)} shouldDisableDate={this.pastDateCheck(new Date())}/>
                    </div>
                    <div>
                        <DatePicker hintText="Event end date" name="eventEndDate" onChange={(event, date)=>this.handleEndDateChange(event,date)} shouldDisableDate={this.pastDateCheck(new Date())} />
                    </div>
                    <div className="field-line">
                        <TextField floatingLabelText="Location" className="align-left" name="location" onChange={this.changeUser} value={this.state.createEventformData.location} errorText={this.state.errors.location} />
                    </div>
                    <div>
                        <SelectField  className="align-left" name="category" value={this.state.createEventformData.category} onChange={(event, index, value)=> this.onCategoryDropDownChange(event, index, value)} autoWidth={true} floatingLabelText="Select Category">
                        {this.props.categories.length>0?this.renderCategories():<div></div>}
                        </SelectField>
                    </div>
                    <RadioButtonGroup name="eventType" onChange={this.handleEventTypeSelection}>
                        <RadioButton value="hourly" label ="hourly" />
                        <RadioButton value="nonhourly" label="non-hourly" />
                    </RadioButtonGroup>

                    <div>
                        {this.state.eventTypeSelected === 'hourly' ? this.handleHourlyParticipantsDisplay() : <div></div>}
                    </div> 
                    <div>
                        {this.state.eventTypeSelected === 'nonhourly' ? this.handleNonHourlyParticipantsDisplay() : <div></div>}
                    </div>        
                    <div className="button-line">
                        <RaisedButton disabled={this.state.disabled} type="submit" label="Submit" primary />
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
                  { this.state.message }
                </Dialog>
            </div>
        );
    }
}

export default CreateEvent;
