/**
 * @author Thenmozhi Subramaniam
 * @name EventDetails
 * @desc renders event details component
 */

import React, { Component } from 'react';
import Moment from 'moment';
import RaisedButton from 'material-ui/RaisedButton';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const items = [
  <MenuItem key={1} value="{1}" primaryText="Volunteer" />,
  <MenuItem key={2} value="{2}" primaryText="Speaker" />,
  <MenuItem key={3} value="{3}" primaryText="Organiser" />,
  <MenuItem key={4} value="{4}" primaryText="Sponsorer" />,
  <MenuItem key={5} value="{5}" primaryText="Player" />,
];

class EventDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventDetails: {
      }
    }
  }

  componentDidMount = () => {
    this.updateEventData();
  };
  updateEventData = () => {
    this.props.getEventDetails(this.props.match.params.id, this.props.userInfo.id).then((response1, error) => {
      this.props.updateEventDetails(this.props.userInfo.userId, JSON.parse(response1.data));
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
      eventDetails: { ...this.state.eventDetails, participantId: value }
    });
  };
  /**
   * This method invokes the approveTask action.
   */
  processForm = () => {
    let enrollmentId = "";
    let enrollmentParticipantId = "";
    if (this.props.eventDetails.registered) {
      enrollmentId = this.props.eventDetails.enrollmentId;
      enrollmentParticipantId = this.props.eventDetails.enrollmentParticipantId;
    } else {
      enrollmentParticipantId = this.state.eventDetails.participantId;
    }
    console.log(this.props.eventDetails);
    this.props.registerUserForEvent(this.props.match.params.id, this.props.userInfo.userId, !this.props.eventDetails.registered, enrollmentParticipantId, enrollmentId, this.props.userInfo.id).then((response, error) => {
      this.updateEventData();
    }, (error) => {
      console.log(error);
    });
  }
  showRegisterButton = () => {
    if (Moment() < Moment(this.props.eventDetails.endDate)) {
      return (
        <div>
          <div>
            <SelectField className="align-left" floatingLabelText="Enrollment Type" name="participantId" value={this.state.eventDetails.participantId} onChange={(event, index, value) => this.onParticipantChange(event, index, value)} autoWidth={true} >
              {items}
            </SelectField>
          </div>

          <div className="button-line">
            <RaisedButton type="button" label={(this.props.eventDetails.status === 'approved' && (this.props.eventDetails.registered === undefined || this.props.eventDetails.registered === false)) ? 'REGISTER' : 'UNREGISTER'} primary onClick={() => { this.processForm() }} />
          </div>
        </div>
      );
    }
  }
  /**
   * @name render
   * @desc render the event details in the page
   * @return event details
   */
  render() {
    console.log('this.props.eventDetails' + this.props.eventDetails);
    return (
      <div className="">
        <div className="event-details">
          <h1 className=""> {this.props.eventDetails.title} </h1>
          <span className="date"> {Moment(this.props.eventDetails.startDate).format('LL') + " - " +
            Moment(this.props.eventDetails.endDate).format('LL')}</span>
          <p className="">
            {this.props.eventDetails.description}
          </p>
          {this.showRegisterButton()}
        </div>
      </div>
    );
  }
}

export default EventDetails;
