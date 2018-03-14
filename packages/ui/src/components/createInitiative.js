/**
 * @author Sandhya Salian
 * @name Create Initiative
 * @desc This component renders the create initiative page
 */
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import History from '../history';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { INVALID_INITIATIVE_TITLE, INVALID_INITIATIVE_DESCRIPTION, INVALID_LEAD_NAME, INVALID_USER, EVENT_FAILURE, INCORRECT_LEAD_NAME } from "../constants/actions";

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
            disabled: true,
            open: false,
            message: '',
            createInitiativeformData: {
                title: '',
                description: '',
                lead: '',
                leadId: '',
                categoryId: '',
                id: ''
            }
        };

    }
    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    /**
     * Function to validate the form
     *
     */
    handleValidation = () => {
        let fields = this.state.createInitiativeformData;
        let errors = {};
        let formIsValid = true;

        if (!fields["title"]) {
            formIsValid = false;
            errors["title"] = INVALID_INITIATIVE_TITLE;
        }
        if (!fields["description"]) {
            formIsValid = false;
            errors["description"] = INVALID_INITIATIVE_DESCRIPTION;
        }
        if (!fields["lead"]) {
            formIsValid = false;
            errors["lead"] = INVALID_LEAD_NAME;
        }
        if (this.state.createInitiativeformData.leadId == undefined || this.state.createInitiativeformData.leadId == '') {
            formIsValid = false;
            errors["lead"] = INCORRECT_LEAD_NAME;
        }

        this.setState({
            errors: errors
        });
        return formIsValid;
    }

    handleInvalidLead = () => {
        let formIsValid = true;
        if (this.state.createInitiativeformData.leadId == undefined || this.state.createInitiativeformData.leadId == '') {
            formIsValid = false;
            this.setState(prevState => ({
                errors: {
                    ...prevState.errors,
                    lead: INCORRECT_LEAD_NAME
                }
            }));
        } else {
            this.setState(prevState => ({
                errors: {
                    ...prevState.errors,
                    lead: ""
                }
            }));
        }

        return formIsValid;
    }

    /**
         * verify the lead user object.
         *
         * @param {object} event - the JavaScript event object
         */
    verifyLeadUser = (event) => {

        this.setState(prevState => ({
            createInitiativeformData: {
                ...prevState.createInitiativeformData,
                leadId: ""
            }
        }));

        this.props.verifyUser(this.state.createInitiativeformData.lead, this.props.userInfo)
            .then((response, error) => {
                if (response.body.length > 0) {
                    this.setState(prevState => ({
                        createInitiativeformData: {
                            ...prevState.createInitiativeformData,
                            leadId: JSON.stringify(response.body[0].id)
                        }
                    }));
                    this.handleInvalidLead();
                }
                else {
                    this.handleInvalidLead();
                }
            }, (error) => {
                alert('Error' + error);
            });
    };
    /**
     * Process the form.
     *
     * @param {object} event - the JavaScript event object
     */
    processForm = (event) => {
        // prevent default action. in this case, action is the form submission event
        event.preventDefault();
        if (this.handleValidation()) {
            this.props.sendInitiativeDetails(this.state.createInitiativeformData, this.props.userInfo).then((response, error) => {
                History.push("/viewinitiative");
            }, (error) => {
                console.log(error);
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
    changeStateData = (event) => {
        const field = event.target.name;
        const user = this.state.createInitiativeformData;
        user[field] = event.target.value;
        this.setState({
            user
        });
    };
    /**
     * Render the component.
     */
    render = () => {
        const actions = [
            <FlatButton
                label="OK"
                primary={true}
                keyboardFocused={true}
                onClick={this.handleClose}
            />,
        ];
        return (
              <div className="widget well list-data hub-widget">
              <div className="widget-header">Create Initiative</div>
                  <form className="" onSubmit={this.processForm}>
                      <div className="field-line">
                          <TextField className="align-left" floatingLabelText="Title" name="title" onChange={this.changeStateData} value={this.state.createInitiativeformData.title} errorText={this.state.errors.title} />
                      </div>
                      <div className="field-line">
                          <TextField className="align-left" floatingLabelText="Description" name="description" onChange={this.changeStateData} value={this.state.createInitiativeformData.description} errorText={this.state.errors.description} />
                      </div>
                      <div className="field-line">
                          <TextField className="align-left" floatingLabelText="Lead" name="lead" onChange={this.changeStateData} value={this.state.createInitiativeformData.lead} onBlur={this.verifyLeadUser} errorText={this.state.errors.lead} />
                      </div>
                      <div className="button-line">
                          <RaisedButton type="submit" label="Create" primary />
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
                    {this.state.message}
                </Dialog>
            </div>
        );
    }
}

export default CreateInitiative;
