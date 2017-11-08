/**
 * @author Thenmozhi Subramaniam
 * @name EventDetails
 * @desc renders event details component
 */

import React, {Component} from 'react';
/*import {nav} from 'material-ui/nav';
import BreadCrumb from './breadcrumb';*/

class EventDetails extends Component
{
  componentDidMount =  () => {
     this.props.getEventDetails();
  }

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

  renderBreadCrumb = () => {
    console.log(this.props);
    return this.state.BreadCrumb.map((item, index) => {
        return (<li key={index}> <a href={item.Url}> {item.Title} </a> </li>);
    })
  }

  render()
  {
    console.log(JSON.stringify(this.props)+"props");
    return (
        <div className="">
          {/*}<BreadCrumb data={this.state.BreadCrumb} />*/}
          <div className="Breadcrumb">
            {this.state.BreadCrumb.length > 0 ? <ul> {this.renderBreadCrumb()} </ul> : ""}
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
