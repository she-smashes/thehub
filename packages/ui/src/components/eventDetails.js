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
    
    console.log('this.props = ', this.props );

    this.props.getEventDetails(this.props.match.params.id,this.props.userInfo.id)
    .then((resp) => {
      console.log('resp = ' , resp.payload.data);
      this.setState({eventDetails: resp.payload.data})
      this.setState({eventDate: Moment(resp.payload.data.startDate).format('LL') + " - " +
      Moment(resp.payload.data.endDate).format('LL')})
    })
  }

  /**
   * @name render
   * @desc render the event details in the page
   * @return event details
   */
  render()
  {
    console.log('aaaaaaaaaaaaaaaaaaaaa' + this.state.eventDetails);
    return (
        <div className="">
          <div className="event-details">
            <h1 className=""> {this.state.eventDetails.title} </h1>
            <span className="date"> {this.state.eventDate}</span>
            <p className="">
              {this.state.eventDetails.description}
            </p>
          </div>
        </div>
    );
  }
}

export default EventDetails;
