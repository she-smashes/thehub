/**
 * @author Shalini Jha
 * @name EventTimelineWidget
 * @desc renders event timeline widget
 */

import React, {Component} from 'react';

class EventTimelineWidget extends Component {

    componentDidMount =  () => {
        this.props.getEventList()
    }

    renderEvents = () => {
      
        return this.props.events.map((event, index) => {
            return <div key={index}>
                <div>Event : {event.description}</div>
                <div>Category : {event.categoryId}</div>
            </div>
        })
    }

    render = () => {
        console.log(this.props)
        return (
            <div>
                <h3>This is event timeline!</h3>
                {this.props.events.length>0?this.renderEvents():<div></div>}
            </div>
        )
    }
}

export default EventTimelineWidget;
