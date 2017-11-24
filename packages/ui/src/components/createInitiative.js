/**
 * @author Sandhya Salian
 * @name Create Initiative
 * @desc This component renders the create initiative page
 */
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const items = [
  <MenuItem key={1} value={1} primaryText="1" />,
  <MenuItem key={2} value={2} primaryText="2" />,
  <MenuItem key={3} value={3} primaryText="3" />,
  <MenuItem key={4} value={4} primaryText="4" />,
  <MenuItem key={5} value={5} primaryText="5" />,
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
                title: '',
                description: '',
                lead:'',
                categoryId:'',
                id: ''
            },
            newInitiative: {
                id:''
            }
            
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

        if (!fields["title"]) {
            formIsValid = false;
            errors["title"] = "Enter Initiative Title";
        }
        if (!fields["description"]) {
            formIsValid = false;
            errors["description"] = "Enter Initiative Description";
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
            this.props.sendInitiativeDetails(this.state.createInitiativeformData,this.props.userInfo.id);
        }
    }


    showMessage=()=> {
        if(this.newInitiative != undefined) {       
            if(this.newInitiative.id != "") {
                alert('Initiative Created!!!')
            } else if(this.newInitiative.errors != "") {
                alert('Initiative not Created!!!')
            }
        }
    }

    componentDidUpdate( prevProps, prevState ){
        this.showMessage();
    }
    /**
     * Change the user object.
     *
     * @param {object} event - the JavaScript event object
     */
    changeStateData=(event)=> {
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
    onCategoryChange=(event,index,value)=>{  
        this.setState({
            createInitiativeformData : {...this.state.createInitiativeformData, categoryId: value}
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
                        <TextField className="align-left" floatingLabelText="Title" name="title" onChange={this.changeStateData} value={this.state.createInitiativeformData.title} errorText={this.state.errors.title} />
                    </div>
                    <div className="field-line">
                        <TextField className="align-left" floatingLabelText="Description" name="description" onChange={this.changeStateData} value={this.state.createInitiativeformData.description} errorText={this.state.errors.description} />
                    </div>
                    <div>
                        <SelectField className="align-left" floatingLabelText="Category" name="categoryId" value={this.state.createInitiativeformData.categoryId} onChange={(event, index, value) => this.onCategoryChange(event, index, value)} autoWidth={true} >
                            {items}
                        </SelectField>
                    </div>
                    <div className="field-line">
                        <TextField className="align-left" floatingLabelText="Lead" name="lead" onChange={this.changeStateData} value={this.state.createInitiativeformData.lead} errorText={this.state.errors.lead} />
                    </div>
                    <div className="button-line">
                        <RaisedButton type="submit" label="Create" primary />
                    </div>
                    
                    <input type="hidden" value={this.state.newInitiative.id}/>
                    
                </form>
            </div>
        );
    }
}

export default CreateInitiative;