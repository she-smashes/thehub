/**
 * @author Shalini Jha
 * @name EventTimelineWidget
 * @desc renders event timeline widget
 */

import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
class EventTimelineWidget extends Component {

    componentDidMount =  () => {
        this.props.getEventList()
    }

    resolveBackgroundColor = (startDate, endDate) => {
        if(endDate < Date.now()) {
            return {margin:10, backgroundColor:"#e5e5e5", color:"silver"};
        }else if(startDate > Date.now()) {
            return {margin:10, backgroundColor:"green"};
        }else {
            return {margin:10, backgroundColor:"yellow"};
        }
    }
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