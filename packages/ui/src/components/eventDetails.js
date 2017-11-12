/**
 * @author Thenmozhi Subramaniam
 * @name EventDetails
 * @desc renders event details component
 */

import React, {Component} from 'react';
import Moment from 'moment';
class EventDetails extends Component
{
  constructor(props){
    super(props);
    this.state = {
      eventDetails:{}
    }
  }

  componentDidMount =  () => {
    this.props.getEventDetails(this.props.match.params.id,this.props.userInfo.id)
    .then((resp) => {
      this.setState({eventDetails: resp.payload.data})
    })
  }

  /**
   * @name render
   * @desc render the event details in the page
   * @return event details
   */
  render()
  {
    return (
        <div className="">
          <div className="event-details">
            <h1 className=""> {this.state.eventDetails.title} </h1>
            <span className="date"> {Moment(this.state.eventDetails.startDate).format('LL')} - {Moment(this.state.eventDetails.endDate).format('LL')} </span>
            <p className="">
              {this.state.eventDetails.description}
            </p>
          </div>
        </div>
    );
  }
}

export default EventDetails;
