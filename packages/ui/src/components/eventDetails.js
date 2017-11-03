import React, {Component} from 'react';
/*import BreadCrumb from './breadcrumb';*/

class EventDetails extends Component
{
  constructor(props){
    super(props);
    this.state = {'Event' : {
      'EventName' : 'Hub creation',
      'EventStartDate' : '10, September 2017',
      'EventEndDate' : '1, December 2017',
      'EventDescription' : 'Creating a website for adding and maintaining initiatives and events.'},
      'BreadCrumb' : [{'Title' : "initiatives", "Url" : "/initiatives"},{'Title' : "EventName", "Url":''}]
    };
  }

  render()
  {
    return (
        <div className="">
          <div className="BreadCrumb">
            <ul>
              <div data={this.state.BreadCrumb} />
            </ul>
          </div>
          <div className="Event-details">
            <h1 className=""> {this.state.Event.EventName} </h1>
            <span className="Date"> {this.state.Event.EventStartDate} - {this.state.Event.EventEndDate} </span>
            <p className="">
              {this.state.Event.EventDescription}
            </p>
          </div>
        </div>
    );
  }

}

export default EventDetails;
