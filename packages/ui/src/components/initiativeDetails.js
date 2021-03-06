/**
 * @author Thenmozhi Subramaniam
 * @name InitiativeDetails
 * @desc renders event details component
 */

import React, { Component } from 'react';

class InitiativeDetails extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    this.updateInitiativeData();
  };

  updateInitiativeData = () => {
    this.props.getInitiativeDetails(this.props.match.params.id, this.props.userInfo).then((response, error) => {
      this.props.updateInitiativeDetails(this.props.userInfo, JSON.parse(response.data));
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
    return (
      <div className="widget well hub-widget">
        <div className="widget-header">Initiative Details</div>
        <div className="event-details">
          <h1 className=""> {this.props.initiativeDetails.title} </h1>
            <p className="" dangerouslySetInnerHTML={{ __html: this.props.initiativeDetails.description}}/>
        </div>
      </div>
    );
  }
}

export default InitiativeDetails;
