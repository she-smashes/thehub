/**
 * @author Uma Govindaraj
 * @name View Events
 * @desc renders view events page
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { Accordion, AccordionItem } from 'react-sanfona';
import './accordian.css';
import RaisedButton from 'material-ui/RaisedButton';
import Moment from 'moment';
import {Link} from 'react-router-dom';

/**
 * 
 * This class the component for rendering the events in the approval page.
 * 
 */

class ViewEvent extends Component {

    /**
     * This method invokes the gets the list of events when the component is mounted.
     */

    componentDidMount = () => {
        this.props.getEventList(this.props.userInfo.id);
    }

    /**
     * This method renders the list of events in an accordion format.
     */
    renderEvents = () => {   
       
        return this.props.viewEvents.map((event, index) => {
            return <ListItem
            key={index}
            primaryText={
                <div>
                    <Link to={`/eventDetails/${event.id}`}>{event.title}</Link>
                </div>
            }
            className = "event-timeline"/>
        });
   
/* 

        return (
            <div>
                {this.props.viewEvents.map((event, index) => {
                        return (
                            <b>
                            {event.id}   
                            </b>                                                       
                        );
                    
                })}
            </div>
        ); */
    }

    render = () => {
        return (       
            <div>
                <h3>List of Events </h3>
                <div id="ViewEvent">
                    {
                       
                        this.props.viewEvents ? this.renderEvents() : <div> </div>
                        }
                </div>
                {/* { this.showDetails(1) } */}
                <div id="eventDetails"></div>
            </div>

        )
    }
}

export default ViewEvent;
