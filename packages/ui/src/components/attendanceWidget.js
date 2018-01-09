import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { Accordion, AccordionItem } from 'react-sanfona';
import './accordian.css';
import Moment from 'moment';
import {Link} from 'react-router-dom';
import CircularProgress from 'material-ui/CircularProgress';
import ProgressLabel from './progressLabelWidget';
import {GridList, GridTile} from 'material-ui/GridList';
import ReactTooltip from 'react-tooltip';
import { StatefulToolTip } from "react-portal-tooltip"
/**
*
 * This class the component for rendering the events in the approval page.
*
 */
const styles = {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
    },
    gridList: {
      display: 'flex',
      overflowX: 'auto',
    },
    titleStyle: {
      color: 'rgb(0, 188, 212)',
      height: 30
    },
  };
const textStyle = {
    'fill': 'green',
    'textAnchor': 'middle'
  };
class AttendanceWidget extends Component {

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

    renderProgressBar = (categoryId, points, allLevels) => {
        let totalLevels = allLevels.length;
        let maxLevel = allLevels[totalLevels - 1];
        let maxPointsForCategory = maxLevel.pointsEndRange;
        let progress = (points/maxPointsForCategory)*100;
        let currentLevel = "0";
        let pointsNeededForNextLevel = 0;
        let startLevelPoints = 0;
        allLevels.map((event, index) => {
            if(event.sequence === "1") {
                startLevelPoints = event.pointsEndRange;
            }
            if(parseInt(points) > parseInt(event.pointsStartRange) && parseInt(points) <= parseInt(event.pointsEndRange)) {
                currentLevel = event.sequence;
                pointsNeededForNextLevel = parseInt(event.pointsEndRange) - parseInt(points);
            }
            if(parseInt(points)+1 === parseInt(event.pointsStartRange)) {
                pointsNeededForNextLevel = parseInt(event.pointsEndRange) - parseInt(points);
            }
        });
        console.log(pointsNeededForNextLevel);
        let msg = "";
        if(currentLevel === "0") {
            pointsNeededForNextLevel = startLevelPoints;
            msg = "You need " + pointsNeededForNextLevel + " points to reach level " + (parseInt(currentLevel)+1)
        } else if(pointsNeededForNextLevel <= 0){
            msg = "You have completed "  + "Level " + (parseInt(currentLevel))
        } else {
            msg = "You need " + pointsNeededForNextLevel + " more points to complete level " + (parseInt(currentLevel));
        }

        const PLabel = <ProgressLabel
                            progress={progress}
                            startDegree={90}
                            progressWidth={8}
                            trackWidth={20}
                            cornersWidth={4}
                            size={80}
                            fillColor="#E9E8E3"
                            trackColor="#E3E2DE"
                            progressColor="#63c2de">
                                <text x="40" y="45" style={textStyle}>L{currentLevel}</text>
                        </ProgressLabel>

        return (
            <div>
                 <StatefulToolTip parent={ PLabel }>
                    {msg}
                </StatefulToolTip>
            </div>
        );
    }

    /**
     * This method renders the list of events.
     */
    renderProgressCategories = () => {

        return this.props.progressCategories.map((event, index) => {
            return (
            <div>
                 <GridTile  key={index}>
                    {this.renderProgressBar(event.category.id, event.points, event.levels)}
                    <h4>{event.category.name}</h4>
                </GridTile>
            </div>);
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
                <div className="widget-header">Progress Widget</div>
                <div className="inner-container">
                <div id="ViewEvent">
                    <GridList style={styles.gridList} cols={2.2}>
                        {
                            this.props.progressCategories ? this.renderProgressCategories() : <div> </div>
                        }
                    </GridList>
                </div>
                {/* { this.showDetails(1) } */}
                <div id="eventDetails"></div>
                </div>

            </div>

        )
    }
}

export default AttendanceWidget;
