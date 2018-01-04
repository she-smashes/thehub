/**
 * @author Shalini Jha
 * @name EventTimelineWidget
 * @desc renders event timeline widget
 */

import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import {Link} from 'react-router-dom';
import {Timeline, TimelineEvent} from 'react-event-timeline'
import Moment from 'moment';

const styles = {
    timeline: {
        "width" : "75%"
    }
}
class EventTimelineWidget extends Component {


    componentDidMount =  () => {
        this.props.getEventList(this.props.userInfo.id).then((response, error) => {
            this.props.updateEventTimelineInfo(JSON.parse(response.data));
          }, (error) => {
            console.log(error);
          });
    }

    /**
     * @name resolvebackgroundColor
     * @desc Resolves background color of an event based on it start date and end date
     * @param {UnixTimeStamp} startDate
     * @param {unicTimeStamp} endDate
     * @return css property
     */
    resolveBackgroundColor = (startDate, endDate) => {
      if(new Date(endDate).getTime() < Date.now()) {
          return { backgroundColor: "#C0C0C0", color: "#000000",  "font-weight": "bold", "padding": "3px"};
      }
      // Start date > current date => Future event
      else if(new Date(startDate).getTime() > Date.now()) {
          return { backgroundColor: "#B1EA7B", color: "#000000",  "font-weight": "bold", "padding": "3px"};
      }
      // Present events
      else {
          return { backgroundColor: "#8BC34A", color: "#000000",  "font-weight": "bold", "padding": "3px"};
      }
    }

    resolveIconColor = (startDate, endDate) => {
        // End date < current date => past event
        if(new Date(endDate).getTime() < Date.now()) {
            return  "#C0C0C0";
        }
        // Start date > current date => Future event
        else if(new Date(startDate).getTime() > Date.now()) {
            return  "#B1EA7B";
        }
        // Present events
        else {
            return  "#8BC34A";
        }
    }


    /**
     * @name renderEvents
     * @desc Iterates through the list of the events and renders the list of events
     * @return Rendered events list {HTML}
     */
    renderEvents = () => {
        return this.props.events.map((event, index) => {
            return <TimelineEvent key={index}
                createdAt={Moment(event.startDate).format('LL')}
                icon={<i class="material-icons md-18">event</i>}
                iconColor={this.resolveIconColor(event.startDate, event.endDate) }
                buttons={<i />}
                container="card"
                style={{ borderRadius: 3 }}
                cardHeaderStyle={ this.resolveBackgroundColor(event.startDate, event.endDate) }
            >
            <b style={{padding: "5px"}}>{event.title}</b>
            </TimelineEvent>
        })
    }

    render = () => {
        return (
            <div className="hub-event-timeline well hub-home-event-timeline">
              <div class="event-timeline">
                  Event Timeline
                </div>
              <div style= {styles.timeline}>
                  <h3>This is event timeline!</h3>
                  <Timeline>
                      {this.props.events.length > 0 ? this.renderEvents() : <div></div>}
                  </Timeline>
              </div>
            </div>
        )
    }
}

export default EventTimelineWidget;
