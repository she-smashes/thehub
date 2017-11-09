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
          <div className="Breadcrumb">
            {this.props.eventDetails.length > 0 ? <ul> {this.renderBreadCrumb()} </ul> : ""}
          </div>
          <div className="Event-details">
            <h1 className=""> {this.props.eventDetails.title} </h1>
            <span className="Date"> {this.props.eventDetails.startDate  } - {this.props.eventDetails.endDate} </span>
            <p className="">
              {this.props.eventDetails.description}
            </p>
          </div>
        </div>
    );
  }
}

export default EventDetails;
