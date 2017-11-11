/**
 * @author Shalini Jha
 * @name EventTimelineWidget
 * @desc renders event timeline widget
 */

import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
class EventTimelineWidget extends Component {

    componentDidMount =  () => {
        this.props.getEventList(this.props.userInfo.id)
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
            return {margin:10, backgroundColor:"#e5e5e5", color:"silver"};
        }
        // Start date > current date => Future event
        else if(new Date(startDate).getTime() > Date.now()) {
            return {margin:10, backgroundColor:"green"};
        }
        // Present events
        else {
            return {margin:10, backgroundColor:"yellow"};
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
                <div>
                    <Link to={`/eventDetails/${event.id}`}>{event.title}</Link>
                </div>
            }
            style={this.resolveBackgroundColor(event.startDate, event.endDate)}
            className = "event-timeline"/>
        })
    }
    
    
    render = () => {
        console.log(this.props)
        return (
            <div>
                <h3>This is event timeline!</h3>   
                <List>
                    {this.props.events.length>0?this.renderEvents():<div></div>}             
                </List>
            </div>
            
        )
    }
}

export default EventTimelineWidget;