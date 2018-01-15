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
import SimpleRichTextEditor from './SimpleRichTextEditor';
const styles = {
    errorText: {
        'position': 'relative',
        'bottom': '15px',
        'font-size': '12px',
        'line-height': '12px',
        'color': 'rgb(244, 67, 54)',
        'transition': 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
    }
}
const location = [
    <MenuItem key={1} value="Bangalore" primaryText="Bangalore" />,
    <MenuItem key={2} value="Noida" primaryText="Noida" />,
    <MenuItem key={3} value="Gurgaon" primaryText="Gurgaon" />,
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
            disabled: true,
            open: false,
            message: '',
            hourlyList:[],
            nonhourlyList:[],
            categoryMap:{},
            createEventformData: {
                title: '',
                description: '',
                initiativeName: '',
                lead: '',
                leadId: '',
                eventStartDate:'',
                eventEndDate:'',
                location: '',
                categoryType: '',
                subCategoryType: '',
                eventHours: '',
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

            let catMap = {};
            this.props.categories.map((event, index) => {
                let key = event.type;
                if(key != '') {
                    if(catMap[key] === undefined) {
                        let catArr = [];
                        catArr.push(this.props.categories[index]);
                        catMap[key] = catArr;
                    } else {
                        let catArr = catMap[key];
                        delete catMap[key];
                        catArr.push(this.props.categories[index]);
                        catMap[key] = catArr;
                    }
                }
            });

            this.setState({
                categoryMap: catMap
            });
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
                 nonhourlyList: nhList
             });
             this.setState({
                 hourlyList: hList
             });
        });
    }

    onLocationDropdownChange = (event, index, value) => {
        this.setState({
            createEventformData: { ...this.state.createEventformData, location: value }
        });
    };

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
        if (!fields["eventStartDate"]) {
            formIsValid = false;
            errors["startDate"] = "Select Event Start Date";
        }
        if (!fields["eventEndDate"]) {
            formIsValid = false;
            errors["endDate"] = "Select Event End Date";
        }
        if (!fields["description"]) {
            formIsValid = false;
            errors["description"] = "Enter Event description";
        }
        if (!fields["location"]) {
            formIsValid = false;
            errors["location"] = "Enter Event location";
        }
        if (!fields["title"]) {
            formIsValid = false;
            errors["title"] = "Enter title";
        }
        if (!fields["lead"]) {
            formIsValid = false;
            errors["lead"] = "Enter Lead name";
        }
        if (!fields["categoryType"]) {
            formIsValid = false;
            errors["categoryType"] = "Select a category or a sub-category";
        }
        if (!fields["eventTypeSelected"]) {
            formIsValid = false;
            errors["eventType"] = "Select event type";
        }
        if (fields["eventTypeSelected"] === 'hourly' && !fields["eventHours"]) {
            formIsValid = false;
            errors["eventHours"] = "Enter Event Hours";
        }
        if (!fields["participantsSelected"]) {
            formIsValid = false;
            errors["participants"] = "Select available roles for this event";
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
            alert(this.state.createEventformData.eventStartDate+"DATE");
            alert(this.state.createEventformData.eventEndDate+"END");
            this.props.sendEventDetails(this.state.createEventformData, this.props.userInfo)
                .then((response, error) => {
                    if (this.props.userInfo.allowedActionList.indexOf('task_count')) {
                        let notificationCount = 0;
                        if (this.props.userInfo.notificationCount !== undefined &&
                            this.props.userInfo.notificationCount !== null ||
                            this.props.userInfo.notificationCount !== '') {
                            notificationCount = this.props.userInfo.notificationCount;
                        }
                        this.props.userInfo.notificationCount = parseInt(notificationCount) + 1;
                        let userString = JSON.stringify(this.props.userInfo)
                        this.props.updateUserInfo(JSON.parse(userString));

                    }
                    History.push("/");
                }, (error) => {
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

    onRichTextChange=(event,index,value)=>{

        let editorText = document.getElementById('hidden-editor').innerHTML.replace(/&apos;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/&gt;/g, '>')
        .replace(/&lt;/g, '<')
        .replace(/&amp;/g, '&');

        this.setState({
            createEventformData : {...this.state.createEventformData, description: editorText}
        });

        this.setState(prevState => ({
            errors: {
                ...prevState.errors,
                startDate: ''
            }
        }));

    };

    /**
     * Function to set the value into the state for initiative start date
     *
    */
    handleStartDateChange=(event,date)=>{
        this.setState({
            createEventformData : {...this.state.createEventformData, eventStartDate: date, eventEndDate: date}
        });
        this.setState(prevState => ({
            errors: {
                ...prevState.errors,
                startDate: '',
                endDate: ''
            }
        }));
    };
    /**
     * Function to set the value into the state for initiative end date
     *
    */
    handleEndDateChange=(event,date)=>{
        this.setState({
            createEventformData : {...this.state.createEventformData, eventEndDate: date}
        });
        this.setState(prevState => ({
            errors: {
                ...prevState.errors,
                endDate: ''
            }
        }));
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
    handleEventTypeSelection = (event) => {


        let evType = event.target.value;
        this.setState(prevState => ({
            createEventformData: {
                ...prevState.createEventformData,
                eventTypeSelected: evType
            }
        }));
        this.setState(prevState => ({
            errors: {
                ...prevState.errors,
                eventType: ''
            }
        }));
        this.setState(prevState => ({
            createEventformData: {
                ...prevState.createEventformData,
                participantsSelected: []
            }
        }));
    }

    handleHourlyParticipantsDisplay = () => {

        return this.state.hourlyList.map((event, index) => {
            return  <Checkbox key={event.id} value={event.id} label={event.participantType} className="align-left" onCheck={this.saveParticipantSelection} style={{ width: 'auto' }}/>
        });
    }
    displayCategoryRadioButtons = () => {
        let catArr =  Object.keys(this.state.categoryMap);
        return catArr.map((event, index) => {

            let catId = '';
            this.props.categories.map((event1, index1) => {
                if(event1.name === event) {
                    catId = event1.id;
                }
            });

            return <RadioButton key={catId} value={catId} label ={event} style={{ width: 'auto' }}/>
        });

    }
    displaySubCategoryRadioButtons = () => {
        if(this.state.createEventformData.categoryType !== undefined && this.state.createEventformData.categoryType !== '') {

            let catGroup = '';
            this.props.categories.map((event1, index1) => {
                if((event1.id + '') === this.state.createEventformData.categoryType) {
                    catGroup = event1.name;
                }
            });

            let subCatArr = this.state.categoryMap[catGroup];
            return subCatArr.map((event, index) => {
                return <RadioButton key={event.id} value={event.id} label ={event.name} style={{ width: 'auto' }}/>
            });
        }
        return;
    }
    handleCategoryTypeSelection = (event) => {
        let catValue = event.target.value;
        this.setState(prevState => ({
            createEventformData: {
                ...prevState.createEventformData,
                categoryType: catValue
            }
        }));
        this.setState(prevState => ({
            errors: {
                ...prevState.errors,
                categoryType: ''
            }
        }));
    }
    handleSubCategoryTypeSelection = (event) => {
        let catValue = event.target.value;
        this.setState(prevState => ({
            createEventformData: {
                ...prevState.createEventformData,
                subCategoryType: catValue
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
        this.setState(prevState => ({
            errors: {
                ...prevState.errors,
                participants: ''
            }
        }));
    }

    handleNonHourlyParticipantsDisplay = () => {
        return this.state.nonhourlyList.map((event, index) => {
            return  <Checkbox key={event.id} value={event.id} label={event.participantType} className="align-left" onCheck={this.saveParticipantSelection} style={{ width: 'auto' }}/>
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
           <div className="widget well hub-widget">
           <div className="widget-header">Create Event</div>
                <form onSubmit={this.processForm}>
                    <div className="field-line">
                        <TextField floatingLabelText="Lead Name" className="align-left" name="lead" onChange={this.changeUser} onBlur={this.verifyLeadUser} value={this.state.createEventformData.lead} errorText={this.state.errors.lead} />
                    </div>
                    <div className="field-line">
                        <TextField floatingLabelText="Title" className="align-left" name="title" onChange={this.changeUser} value={this.state.createEventformData.title} errorText={this.state.errors.title} />
                    </div>

                    <div>
                    <SelectField className="align-left" name="initiativeName" value={this.state.createEventformData.initiativeName} onChange={(event, index, value)=> this.onInitiativeDropDownChange(event, index, value)} autoWidth={true} floatingLabelText="Select Initiative" errorText={this.state.errors.initiativeName}>
                     {this.props.approvedInitiatives.length>0?this.renderInitiatives():<div></div>}
                    </SelectField>
                    </div>
                    <div>
                        <DatePicker className="field-line" hintText="Event start date" name="eventStartDate" onChange={(event, date)=>this.handleStartDateChange(event,date)} shouldDisableDate={this.pastDateCheck(new Date())}/>
                        <div style={styles.errorText} className="field-line align-left">
                            <br/>
                            {(this.state.errors.startDate != undefined && this.state.errors.startDate != '') ? this.state.errors.startDate : <div></div>}
                        </div>
                    </div>

                    <div className="field-line">
                        <SelectField className="align-left" multiple={true} hintText="Location" name="location" value={this.state.createEventformData.location} onChange={(event, index, value) => this.onLocationDropdownChange(event, index, value)} errorText={this.state.errors.location}>
                            {location}
                        </SelectField>
                    </div>

                    <div className="field-line">
                    <br/>
                    <label className="align-left bold">Enter Event description</label>
                    <br/>

                    <SimpleRichTextEditor name= 'description' value={this.state.createEventformData.description}
                    placeholder="Enter description here"
                    toolbarClassName="demo-toolbar"
                    editorClassName="demo-editor"
                    format='html' markup='Enter description here' onBlur={this.onRichTextChange}
                    />
                    <div style={styles.errorText} className="field-line align-left">
                            <br/>
                            <br/>
                            {(this.state.errors.description != undefined && this.state.errors.description != '') ? this.state.errors.description : <div></div>}
                        </div>
                    </div>

                    <br/>
                    <div className="field-line">
                        <label className="align-left bold">Select Category</label>
                        <br/>
                        <RadioButtonGroup className="align-left" name="categoryType" onChange={this.handleCategoryTypeSelection} style={{ display: 'flex' }} errorText={this.state.errors.categoryType}>
                            {this.state.categoryMap != undefined ? this.displayCategoryRadioButtons() : <div> </div>}
                        </RadioButtonGroup>

                        <div style={styles.errorText} className="align-left">
                            <br/>
                            {(this.state.errors.categoryType != undefined && this.state.errors.categoryType != '') ? this.state.errors.categoryType : <div></div>}
                        </div>
                    </div>
                    <br/>
                    <div className="field-line">
                    {this.displaySubCategoryRadioButtons()?<label className="align-left bold">Select Sub Category</label>:<div></div>}
                        <RadioButtonGroup className="align-left" name="subCategoryType" onChange={this.handleSubCategoryTypeSelection} style={{ display: 'flex' }}>
                            {this.state.createEventformData.categoryType != undefined ? this.displaySubCategoryRadioButtons() : <div> </div>}
                        </RadioButtonGroup>
                    </div>
                    <div className="field-line border-line"></div>
                    <div className="field-line">
                        <label className="align-left bold">Select Event Type</label>
                        <RadioButtonGroup className="align-left" name="eventType" onChange={this.handleEventTypeSelection} style={{ display: 'flex' }}>
                            <RadioButton value="hourly" label ="hourly" style={{ width: '100%' }} />
                            <RadioButton value="nonhourly" label="non-hourly" style={{ width: '100%' }} />
                        </RadioButtonGroup>
                        <div style={styles.errorText} className="align-left">
                            <br/>
                            {(this.state.errors.eventType != undefined && this.state.errors.eventType != '') ? this.state.errors.eventType : <div></div>}
                        </div>

                    </div>

                    <div class="checklist">
                        {this.state.createEventformData.eventTypeSelected === 'hourly' ? <label className="align-left bold">Select Hourly Participant Type</label> : <div></div>}
                        {this.state.createEventformData.eventTypeSelected === 'hourly' ? this.handleHourlyParticipantsDisplay() : <div></div>}
                        {
                            this.state.createEventformData.eventTypeSelected === 'hourly' ?
                                <div className="field-line">
                                    <TextField floatingLabelText="No Of Hours" className="align-left" name="eventHours" onChange={this.changeUser} value={this.state.createEventformData.eventHours} errorText={this.state.errors.eventHours} />
                                </div>
                                :
                                <div></div>
                        }


                    </div>
                    <div class="checklist">
                        {this.state.createEventformData.eventTypeSelected === 'nonhourly' ? <label className="align-left bold">Select Non-Hourly Participant Type</label> : <div></div>}
                        {this.state.createEventformData.eventTypeSelected === 'nonhourly' ? this.handleNonHourlyParticipantsDisplay() : <div></div>}
                    </div>
                    <div style={styles.errorText} className="align-left">
                    <br/>
                        {((this.state.errors.eventType === undefined || this.state.errors.eventType === '') && this.state.errors.participants != undefined && this.state.errors.participants != '') ? this.state.errors.participants : <div></div>}
                    </div>

                    <div className="button-line margin35">
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
