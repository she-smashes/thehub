/**
 * @author Thenmozhi Subramaniam
 * @name EventDetails
 * @desc renders event details component
 */

import React, { Component } from 'react';
import Moment from 'moment';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Link} from 'react-router-dom';

class EventDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enrollmentDetails: {
        enrollmentId: '',
        enrollmentParticipantId: '',
        registered: false
      }
    }
  }

  componentDidMount = () => {
    this.updateEventData();
    this.updateEnrollmentsData();
  };


  updateEnrollmentsData = () => {
    this.props.getAllEnrollmentsForEvent(this.props.match.params.id, this.props.userInfo).then((response, error) => {
      this.props.updateEventEnrollmentsData(this.props.userInfo, JSON.parse(response.data));     
    }, (error) => {
      console.log(error);
    });
  }


  updateEnrollmentTypeList = (participants, enrollmentParticipantId) => {
    const items = [];
    participants.map(item => {
      let itemId = item.id + "";
      if(itemId === enrollmentParticipantId) {
        items.push(<MenuItem key={itemId} value={itemId} label={item.participantType} primaryText={item.participantType}  checked={true} />);
      } else {
        items.push(<MenuItem key={itemId} value={itemId} label={item.participantType} primaryText={item.participantType} />);
      }
    });
    return items;
  }

  updateEventData = () => {
    this.props.getEventDetails(this.props.match.params.id, this.props.userInfo).then((response, error) => {
     
      this.props.updateEventDetails(this.props.userInfo, JSON.parse(response.data));
      this.setState({
        enrollmentDetails: {
          ...this.state.enrollmentDetails,
          enrollmentParticipantId: this.props.eventDetails.enrollmentParticipantId,
          enrollmentId: this.props.eventDetails.enrollmentId,
          registered: this.props.eventDetails.registered
        }
      });
    }, (error) => {
      console.log(error);
    });
  }

  /**
    * Function to set the value into the state for participant drop down
    *
   */
  onParticipantChange = (event, index, value) => {
    this.setState({
      enrollmentDetails: { ...this.state.enrollmentDetails, enrollmentParticipantId: value }
    });
  };
  /**
   * This method invokes the approveTask action.
   */
  processForm = () => {
    this.props.registerUserForEvent(this.props.match.params.id, this.props.userInfo, this.state.enrollmentDetails).then((response, error) => {
      this.updateEventData();
    }, (error) => {
      console.log(error);
    });
  }
  showRegisterButton = () => {
    if (this.props.eventDetails.status === 'approved' && Moment() < Moment(this.props.eventDetails.endDate)) {
      return (
        <div>
{/*    commenting since enrollment type is not required in eventdetails page       <div>
            <SelectField className="align-left" floatingLabelText="Enrollment Type" name="enrollmentParticipantId" value={this.state.enrollmentDetails.enrollmentParticipantId} onChange={(event, index, value) => this.onParticipantChange(event, index, value)} autoWidth={true} disabled={this.state.enrollmentDetails.registered === true ? true : false}>
              {this.updateEnrollmentTypeList(this.props.eventDetails.participants, this.state.enrollmentDetails.enrollmentParticipantId)}
            </SelectField>
          </div> */}

          <div className="button-line">
            <RaisedButton type="button" label={((this.state.enrollmentDetails.registered === undefined || this.state.enrollmentDetails.registered === false)) ? 'REGISTER' : 'UNREGISTER'} primary onClick={() => { this.processForm() }} />
          </div>
        </div>
      );
    }
  }

  showUploadAttendanceButton = () => {
    if (this.props.eventDetails.status === 'approved' && Moment() < Moment(this.props.eventDetails.endDate)) {
      return (
        <Link to={`/uploadattendance/${this.props.match.params.id}`}>Upload Attendance</Link>
      );
    }
  }

  renderEventEnrollments = () => {   
    
     return this.props.eventEnrollmentsDetails.map((event, index) => {
         return (
          <TableRow key={index}> 
            <TableRowColumn> {event.users.username} </TableRowColumn>
            <TableRowColumn> {Moment(event.registeredOn).format('LL')} </TableRowColumn>
          </TableRow> 
         );
     });
 }

 renderEventEnrollmentsDetails = () => {   
  
   return (
    <Table style={{"width":'50%'}}>
    <TableHeader displaySelectAll ={false} adjustForCheckbox={false}>
      <TableRow>
        <TableHeaderColumn colSpan="2" tooltip="Participants details" style={{textAlign: 'center'}}>
        Participants details
        </TableHeaderColumn>
      </TableRow>
      <TableRow>
        <TableHeaderColumn  tooltip="The user name" >User Name</TableHeaderColumn>
        <TableHeaderColumn  tooltip="Registered for the event on" >Registered On</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={false}>
    {this.renderEventEnrollments()}
    </TableBody>
    </Table>
   );
}


  /**
   * @name render
   * @desc render the event details in the page
   * @return event details
   */
  render() {

    return (
      <div className="">
        <div className="event-details">
          <h1 className=""> {this.props.eventDetails.title} </h1>
          <span className="date"> {Moment(this.props.eventDetails.startDate).format('LL') + " - " +
            Moment(this.props.eventDetails.endDate).format('LL')}</span>
          <p className="" dangerouslySetInnerHTML={{ __html: this.props.eventDetails.description }} />
          <span className="hours"> <b>Event Hours: </b>{this.props.eventDetails.hours} </span>
          <br></br>
          <br></br>
          {this.showRegisterButton()}
          <br></br>
          <br></br>
          <div className="event-attendance">
            {
              (this.props.userInfo.userId === this.props.eventDetails.createdBy) ?
                this.showUploadAttendanceButton() : <div></div>
            }
          </div>
        </div>
        
        <div className="event-participants">
        {
          (this.props.userInfo.userId === this.props.eventDetails.createdBy && 
          this.props.eventEnrollmentsDetails && 
          this.props.eventEnrollmentsDetails.length > 0) ? 
          this.renderEventEnrollmentsDetails():<div></div>
        }
        </div>
        
      </div>
    );
  }
}

export default EventDetails;
