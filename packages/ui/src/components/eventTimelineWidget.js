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
        if(endDate < Date.now()) {
            return {margin:10, backgroundColor:"#e5e5e5", color:"silver"};
        }else if(startDate > Date.now()) {
            return {margin:10, backgroundColor:"green"};
        }else {
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
            primaryText={event.title}
            style={this.resolveBackgroundColor(Number(event.startDate), Number(event.endDate))} />
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