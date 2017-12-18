import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { Accordion, AccordionItem } from 'react-sanfona';
import './accordian.css';
import Moment from 'moment';
import {Link} from 'react-router-dom';

import ProgressLabel from 'react-progress-label';


/**
 * 
 * This class the component for rendering the events in the approval page.
 * 
 */

class ProgressWidget extends Component {

    constructor(props) {
        super(props);
      }

    /**
     * This method invokes the gets the list of events when the component is mounted.
     */

    componentDidMount = () => {
        this.props.getProgressCategoriesList(this.props.userInfo.id).then((response, error) => {
            this.props.updateProgressCategoriesInfo(JSON.parse(response.data));    
          }, (error) => {
            console.log(error);
          });
    }

    /**
     * This method renders the list of events.
     */
    renderProgressCategories = () => {   
       
        return this.props.progressCategories.map((event, index) => {
            return <ListItem
            key={index}
            primaryText={
                event.categoryId
            }
            />
        });
    }

    render = () => {
        let textStyle = {
            'fill': '#ffffff',
            'textAnchor': 'middle'
          };
          let progress = 50;
        return (       
            <div>
                <h3>List of Events </h3>
                <div id="ViewEvent">
                    {
                       
                        this.props.progressCategories ? this.renderProgressCategories() : <div> </div>
                        }
                </div>
                {/* { this.showDetails(1) } */}
                <div id="eventDetails"></div>


                <ProgressLabel
      progress={progress}
      startDegree={60}
      progressWidth={8}
      trackWidth={20}
      cornersWidth={4}
      size={400}
      fillColor="black"
      trackColor="red"
      progressColor="green">

      <text x="200" y="200" style={textStyle}>{`${progress}%`}</text>

    </ProgressLabel>

            </div>

        )
    }
}

export default ProgressWidget;
