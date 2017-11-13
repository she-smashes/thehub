/**
 * @author Sandhya Salian
 * @name Create Initiative
 * @desc This component renders the create initiative page
 */
import React from 'react';
import { Card } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { Route } from 'react-router-dom';
import History from '../history';

const items = [
  <MenuItem key={1} value={1} primaryText="1-5" />,
  <MenuItem key={2} value={2} primaryText="6-10" />,
  <MenuItem key={3} value={3} primaryText="11-15" />,
  <MenuItem key={4} value={4} primaryText="16-25" />,
  <MenuItem key={5} value={5} primaryText="26-35" />,
];

class CreateInitiative extends React.Component {
    /**
     * Class constructor.
     */
    constructor(props) {
        super(props);

        // set the initial component state

        this.state = {
            errors: {},
            createInitiativeformData: {
                initiativeName: '',
                approverName: '',
                intiativeStartDate:'',
                intiativeEndDate:'',
                totalParticipants: ''
            },
            
        };

    }
    /**
     * Function to validate the form
     *
     */
    handleValidation=()=> {
        let fields = this.state.createInitiativeformData;
        let errors = {};
        let formIsValid = true;
        console.log(this.state.createInitiativeformData.intiativeEndDate);

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
        if (this.handleValidation()) {
            this.props.sendInitiativeDetails(this.state.createInitiativeformData,this.props.userInfo)
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
        const user = this.state.createInitiativeformData;
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
            createInitiativeformData : {...this.state.createInitiativeformData, totalParticipants: value}
        });
    };
    /**
     * Function to set the value into the state for initiative start date
     *
    */
    handleStartDateChange=(event,date)=>{
        this.setState({
            createInitiativeformData : {...this.state.createInitiativeformData, intiativeStartDate: date}
        });
    };
    /**
     * Function to set the value into the state for initiative end date
     *
    */
    handleEndDateChange=(event,date)=>{
        this.setState({
            createInitiativeformData : {...this.state.createInitiativeformData, intiativeEndDate: date}
        });
    };

    /**
     * Render the component.
     */
    render=()=> {
        return ( 
           <div className="container  App">
                <form onSubmit={this.processForm}>
                    <h2 className="card-heading">Create Initiative Form</h2>
                    <div className="field-line">
                        <TextField floatingLabelText="Initiative Name" className="align-left" name="initiativeName" onChange={this.changeUser} value={this.state.createInitiativeformData.initiativeName} errorText={this.state.errors.initiativeName} />
                    </div>
                    <div>
                        <DatePicker hintText="Initiative start date" name="initiativeStartDate" onChange={(event, date)=>this.handleStartDateChange(event,date)} shouldDisableDate={this.pastDateCheck(new Date())}/>
                    </div>
                    <div>
                        <DatePicker hintText="Initiative end date" name="initiativeEndDate" onChange={(event, date)=>this.handleEndDateChange(event,date)} shouldDisableDate={this.pastDateCheck(new Date())} />
                    </div>
                    <div>
                    <SelectField  className="align-left" name="totalParticipants" value={this.state.createInitiativeformData.totalParticipants} onChange={(event, index, value)=> this.onParticipantDropDownChange(event, index, value)} autoWidth={true} floatingLabelText="Participants">
                        {items}
                    </SelectField>
                        
                    </div>
                    <div className="field-line">
                        <TextField className="align-left" floatingLabelText="Approver Name" name="approverName" onChange={this.changeUser} value={this.state.createInitiativeformData.approverName} errorText={this.state.errors.approverName} />
                    </div>

                    <div className="button-line">
                        <RaisedButton type="submit" label="Log in" primary />
                    </div>
                </form>
            </div>
        );
    }
}

export default CreateInitiative;