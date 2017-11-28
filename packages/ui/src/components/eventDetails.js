/**
 * @author Thenmozhi Subramaniam
 * @name EventDetails
 * @desc renders event details component
 */

import React, { Component } from 'react';
import Moment from 'moment';
import RaisedButton from 'material-ui/RaisedButton';

class EventDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventDetails: {
        events: {
          
        }
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
   * This method invokes the approveTask action.
   */
  processForm = () => {
let enrollmentId = "";
    if(this.props.eventDetails.registered) {
      enrollmentId = this.props.eventDetails.enrollmentId;
    }
    this.props.registerUserForEvent(this.props.match.params.id, this.props.userInfo.userId, !this.props.eventDetails.registered, enrollmentId, this.props.userInfo.id).then((response, error) => {
      this.updateEventData();
    }, (error) => {
      console.log(error);
    });
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
          <div className="button-line">
            <RaisedButton type="button" label={(this.props.eventDetails.registered === undefined || this.props.eventDetails.registered === false) ? 'REGISTER' : 'UNREGISTER'} primary onClick={() => { this.processForm() }} />
          </div>

        </div>
      </div>
    );
  }
}

export default EventDetails;
