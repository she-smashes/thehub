/**
 * @author Shalini Jha
 * @name EventTimelineWidget
 * @desc renders event timeline widget
 */

import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import {Link} from 'react-router-dom';
import Moment from 'moment';
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
        // End date < current date => past event
        if(new Date(endDate).getTime() < Date.now()) {
            return "past-event-icon";
        }
        // Start date > current date => Future event
        else if(new Date(startDate).getTime() > Date.now()) {
            return "future-event-icon";
        }
        // Present events
        else {
            return "present-event-icon";
        }
    }

    /**
     * @name renderEvents
     * @desc Iterates through the list of the events and renders the list of events
     * @return Rendered events list {HTML}
     */
    renderEvents = () => {
        return this.props.events.map((event, index) => {
            return <ListItem
            key={index}
            primaryText={
                    <Link to={`/eventDetails/${event.id}`}>
                        <span style={{width:"20%"}} className={"icon " + this.resolveBackgroundColor(event.startDate, event.endDate)}></span>
                        <span style={{width:"60%", "textAlign":"left"}}  className="event-name">{event.title} </span>
                        <span style={{width:"20%"}} className="event-date">{Moment(event.startDate).format('DD/MM/YYYY')}</span>
                    </Link>
            }
            className = "event-timeline"/>
        })
    }

    render = () => {
        return (
            <div className="hub-event-timeline well hub-home-event-timeline">
                <div className="event-timeline">Event Timeline</div>
                <List className="col-md-10 col-sm-10 col-xs-12 events-table">
                    {this.props.events.length>0?this.renderEvents():<div></div>}
                </List>
                <div className="event-timeline-widget">
                </div>
            </div>

        )
    }
}

export default EventTimelineWidget;
