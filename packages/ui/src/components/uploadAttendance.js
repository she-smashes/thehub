/**
 * @author Thenmozhi Subramaniam
 * @name EventDetails
 * @desc renders event details component
 */

import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'; import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import { INVALID_USER, EVENT_FAILURE } from "../constants/actions";


class UploadAttendance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventData: {},
      attendanceData: {},
      attendanceDataWithUserId: {},
      errors: {},
      errorData: {},
      fieldsDisabled: false,
      attendanceMessage: ""
    }
  }

  componentDidMount = () => {
    this.getEventData();
  };

  getEventData = () => {
    this.props.getEventDetails(this.props.match.params.id, this.props.userInfo).then((response, error) => {
      this.props.updateEventDetails(this.props.userInfo, JSON.parse(response.data));
      
      let eventData = JSON.parse(response.data);
      let attendanceSubmitted = false;
      eventData.participants.map((participant, participantIndex) => {
        let userNames = "";
        if (eventData.enrollments !== undefined) {
          eventData.enrollments.map((enrollment, enrollmentIndex) => {
            if(enrollment.attendanceFlag === 'submit') {
              attendanceSubmitted = true;
            }
            let participantIdStr = participant.id + '';
            if (enrollment.enrollmentType !== undefined && enrollment.enrollmentType === participantIdStr) {
              userNames = enrollment.users.username + ", " + userNames;
            }
          });
        }
        userNames = userNames.substring(0, userNames.length - 2);      
        let attendanceData = this.state.attendanceData;
        attendanceData[participant.id] = userNames;
        this.setState({
          attendanceData
        });
        if(attendanceSubmitted) {
          this.setState({
            fieldsDisabled: true
          });
          this.setState({
            attendanceMessage: "Attendance submitted for the event"
          });
        }
      });      
    }, (error) => {
      console.log(error);
    });
  };

  showAttendancePerRole = (participants) => {
    if (participants !== undefined) {
      return participants.map((participant, participantIndex) => {
        console.log(this.state.attendanceData[participant.id]);
        let usName = "userNames_" + participant.id;        
        return (<TableRow key={participantIndex}>
          <TableRowColumn key={1} > {participant.participantType} </TableRowColumn>
          <TableRowColumn key={2}>
            <div className="field-line">
              <TextField floatingLabelText="Participant Names" className="align-left" name={usName} multiline="true"
                value={this.state.attendanceData[participant.id]} onChange={this.changeAttendanceData} errorText={this.state.errorData[participant.id]} 
                disabled = {this.state.fieldsDisabled}/>
            </div>
          </TableRowColumn>
        </TableRow>);
      });
    }
  };
  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeAttendanceData = (event) => {
    let field = event.target.name;
    let fieldArr = field.split("_");
    field = fieldArr[1];
    const attendanceData = this.state.attendanceData;
    attendanceData[field] = event.target.value;
    this.setState({
      attendanceData
    });
  };
  /**
   * verify the users.
   */
  verifyUsers = (attendanceFlag) => {

    const attendanceDataWithUserId = {};
    const errors = {};
    const errorData = {};

    this.setState({
      attendanceDataWithUserId,
      errors,
      errorData
    });

    let userArr = [];
    if (this.state.attendanceData !== undefined && this.state.attendanceData !== '') {
      console.log(this.state.attendanceData);
      Object.keys(this.state.attendanceData).map((event, index) => {
        userArr = userArr.concat(this.state.attendanceData[event].split(','));
      });

      let errorMap = {};
      if (userArr.length > 0) {
        this.props.verifyUsers(userArr, this.props.userInfo, 'save')
          .then((response, error) => {
            let users = JSON.parse(response.data);
            Object.keys(this.state.attendanceData).map((participantId, index) => {
              this.state.attendanceData[participantId].split(',').map((username, usernameIndex) => {
                let foundUserName = false;
                let userId = "";
                users.map((userEvent, userIndex) => {
                  if (userEvent.username === username) {
                    foundUserName = true;
                    userId = userEvent.id;
                  }
                });
                if (foundUserName) {
                  const attendanceDataWithUserId = this.state.attendanceDataWithUserId;
                  let userIds = attendanceDataWithUserId[participantId];
                  if (userIds === undefined) {
                    userIds = [];
                  }
                  userIds.push(userId);
                  attendanceDataWithUserId[participantId] = userIds;
                  this.setState({
                    attendanceDataWithUserId
                  });
                } else {
                  const errors = this.state.errors;
                  let errorUserNames = errors[participantId];
                  if (errorUserNames === undefined) {
                    errorUserNames = [];
                  }
                  errorUserNames.push(username);
                  errors[participantId] = errorUserNames;
                  this.setState({
                    errors
                  });
                }
              });
            });

            if (this.handleValidation()) {

              this.props.saveAttendanceData(this.props.match.params.id, this.props.userInfo, this.state.attendanceDataWithUserId, attendanceFlag).then((response, error) => {
                if(attendanceFlag === 'submit') {
                  this.setState({
                    fieldsDisabled: true
                  });
                  this.setState({
                    attendanceMessage: "Attendance submitted for the event"
                  });
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
                }
              }, (error) => {
                console.log(error);
              });
            }
          }, (error) => {
            alert('Error' + error);
          });
      }
    }

  };


  handleValidation = () => {
    let fields = this.state.errors;
    let errorData = {};
    let formIsValid = true;

    Object.keys(this.state.errors).map((participantId, index) => {
      let userNameString = "";
      this.state.errors[participantId].map((userName, index) => {
        userNameString = userName + ", " + userNameString;
      });
      if (userNameString !== '') {
        userNameString = userNameString.substring(0, userNameString.length - 2) + " ";
        formIsValid = false;
        errorData[participantId] = "UserName " + userNameString + "invalid.";
      }
    });

    this.setState({
      errorData: errorData
    });
    return formIsValid;
  }

  saveAttendanceData = () => {
    this.verifyUsers('save');
  }

  submitAttendanceData = () => {
    this.verifyUsers('submit');    
  }

  showAttendanceButtons = (participants) => {
    if (participants !== undefined) {
      return (<TableRow>
        <TableRowColumn key={1} >
          <div className="button-line margin35">
            <RaisedButton type="submit" label="Save" primary onClick={() => { this.saveAttendanceData() }} disabled = {this.state.fieldsDisabled}/>
          </div>
        </TableRowColumn>
        <TableRowColumn key={2}>
          <div className="button-line margin35">
            <RaisedButton type="submit" label="Submit" primary onClick={() => { this.submitAttendanceData() }} disabled = {this.state.fieldsDisabled}/>
          </div>
        </TableRowColumn>
      </TableRow>);
    }
  };

  renderAttendanceForm = (eventData) => {
    return (
      <div>
        <br></br>
        <div class="alert alert-success" role="alert" style={{"width": "50%"}}>
          <p style={{"margin-left": "201px"}}>{this.state.attendanceMessage}</p>
        </div>
        <Table style={{ "width": '50%' }}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn colSpan="2" tooltip="Upload Attendance" style={{ textAlign: 'center' }}>
                Upload Attendance
          </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn tooltip="Role" >Role</TableHeaderColumn>
              <TableHeaderColumn tooltip="User Name" >User Name</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {this.showAttendancePerRole(eventData.participants)}
            {this.showAttendanceButtons(eventData.participants)}
          </TableBody>
        </Table>
      </div>
    );
  };

  /**
   * @name render
   * @desc render the event details in the page
   * @return event details
   */
  render() {
    return (
      <div className="">
        {
          (this.props.eventData !== '' && this.props.eventData !== undefined && this.props.eventData !== null) ? this.renderAttendanceForm(this.props.eventData) : <div></div>
        }
      </div>
    );
  }
}

export default UploadAttendance;
