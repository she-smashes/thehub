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
import * as qs from 'querystring';

/**
 * 
 * This class the component for rendering the events in the approval page.
 * 
 */

class ViewEvent extends Component {

    constructor(props) {
        super(props);
        // set the initial component state
        this.state = {
          viewEvents: {},
        };
      }

    /**
     * This method invokes the gets the list of events when the component is mounted.
     */

    componentDidMount = () => {

        let categoryId = '';
        if(this.props.location.search != undefined && this.props.location.search.length > 1) {
            let queryParams = qs.parse(this.props.location.search.substring(1));
            if(queryParams.categoryId !== undefined && queryParams.categoryId !== '') {
                categoryId = queryParams.categoryId;
            }
        }
        
        this.props.getEventList(this.props.userInfo.id, categoryId).then((response, error) => {
            if(categoryId !== '' && categoryId !== undefined) {
                this.props.updateCategoryEventsInfo(JSON.parse(response.data));    
            } else {
                this.props.updateViewEventsInfo(JSON.parse(response.data));    
            }
          }, (error) => {
            console.log(error);
          });
    }

    /**
     * This method renders the list of events.
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
