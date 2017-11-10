/**
 * @author Thenmozhi Subramaniam
 * @name EventDetails
 * @desc renders event details component
 */

import React, {Component} from 'react';

class EventDetails extends Component
{
  componentDidMount =  () => {
     this.props.getEventDetails(this.props.match.params.id,this.props.userInfo.id);
  }
  constructor(props){
    super(props);
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
            <h1 className=""> {this.props.eventDetails.title} </h1>
            <span className="date"> {this.props.eventDetails.startDate  } - {this.props.eventDetails.endDate} </span>
            <p className="">
              {this.props.eventDetails.description}
            </p>
          </div>
        </div>
    );
  }
}

export default EventDetails;
