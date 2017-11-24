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
      eventDetails: {}
    }
  }


  componentDidMount = () => {
    this.props.getEventDetails(this.props.match.params.id, this.props.userInfo.id);
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
          <p className="">
            {this.props.eventDetails.description}
          </p>
          <div className="button-line">
            <RaisedButton type="button" label="REGISTER" />
          </div>

        </div>
      </div>
    );
  }
}

export default EventDetails;
