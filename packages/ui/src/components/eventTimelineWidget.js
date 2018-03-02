/**
 * @author Shalini Jha
 * @name EventTimelineWidget
 * @desc renders event timeline widget
 */

import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import {Link} from 'react-router-dom';
import {Timeline, TimelineEvent} from 'react-event-timeline'
import _ from 'lodash';
import Slider from 'react-slick';
import Moment from 'moment';

const styles = {
    timeline: {
        "width" : "100%",
        "paddingLeft" : "50px",
        "paddingRight": "50px"
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
        // End date < current date => past event
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
            return  "#83a7ff";
        }
        // Start date > current date => Future event
        else if(new Date(startDate).getTime() > Date.now()) {
            return  "#fec74e";
        }
        // Present events
        else {
            return  "fec74e";
        }
    }
    
    resolveButtonDisplay = (startDate, endDate) => {
        // End date < current date => past event
        if(new Date(endDate).getTime() < Date.now()) {
        return  <span class="inner-font date evt-button view">View</span>;
        }
        // Start date > current date => Future event
        else if(new Date(startDate).getTime() > Date.now()) {
            return  <span class="inner-font date evt-button participate">Participate</span>;
        }
        // Present events
        else {
            return <span class="inner-font date evt-button participate">Participate</span>;
        }
    }      

    render = () => {
        let rows = _.chunk(this.props.events, 3);        
        var settings = {
            arrows: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            centerPadding: '50px'
          };
        return (
            <div>
                <div  className="widget-header">Events Timeline</div>
                <div  style= {styles.timeline} className="inner-container">
                <Slider {...settings}>
                {
                    rows.map((row) => (
                        <div className="rows">
                        {
                        row.map((event,index) => (                            
                                <Timeline>
                                <TimelineEvent key={index}                               
                                title = {<Link className="inner-font" to={`/event/${event.title}/${event.id}`} style={{"color":"black"}}>{event.title}</Link>}
                                subtitle={<Link className="inner-font date" to={`/event/${event.title}/${event.id}`} style={{"color":"black"}}>{Moment(event.startDate).format('LL')}</Link>}                                
                                icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><circle fill={this.resolveIconColor(event.startDate, event.endDate) } cx="12" cy="12" r="8"/></svg>}
                                iconColor={this.resolveIconColor(event.startDate, event.endDate) }
                                buttons={<Link className="inner-font" to={`/event/${event.title}/${event.id}`} style={{"color":"black"}}>{this.resolveButtonDisplay(event.startDate, event.endDate) }</Link>}
                                bubbleStyle= {{ borderWidth: 0, background: "none", width:16, height: 16, marginLeft:9}}
                                
                                style={{ borderRadius: 3 }}
                                cardHeaderStyle={ this.resolveBackgroundColor(event.startDate, event.endDate) }
                            >                               
                            </TimelineEvent>                    
                            </Timeline>                            
                        ))
                        }
                        </div>
                    ))
                }
                </Slider>
                </div>
            </div>

        )
    }
}

export default EventTimelineWidget;
