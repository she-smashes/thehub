/**
 * @author Thenmozhi Subramaniam
 * @name EventDetails
 * @desc renders event details component
 */

import React, {Component} from 'react';

class EventDetails extends Component
{
  
  constructor(props){
    super(props);
    this.state = {
      eventDetails:{},
      breadCrumb:[]
    }
  }

  componentDidMount =  () => {
    this.props.getEventDetails(this.props.match.params.id,this.props.userInfo.id)
    .then((resp) => {
      this.setState({eventDetails: resp.payload.data})
    })
  }

  renderBreadCrumb = () => {
    return this.state.breadCrumb.map((item, index) => {
        return (<li key={index}> <a href={item.Url}> {item.Title} </a> </li>);
    })
  }

  render()
  {
    return (
        <div className="">
          <div className="Breadcrumb">
            {this.state.eventDetails.length > 0 ? <ul> {this.renderBreadCrumb()} </ul> : ""}
          </div>
          <div className="Event-details">
            <h1 className=""> {this.state.eventDetails.title} </h1>
            <span className="Date"> {this.state.eventDetails.startDate  } - {this.state.eventDetails.endDate} </span>
            <p className="">
              {this.state.eventDetails.description}
            </p>
          </div>
        </div>
    );
  }
}

export default EventDetails;
