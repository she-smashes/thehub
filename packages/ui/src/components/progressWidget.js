import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { Accordion, AccordionItem } from 'react-sanfona';
import './accordian.css';
import Moment from 'moment';
import { Link } from 'react-router-dom';
import CircularProgress from 'material-ui/CircularProgress';
import ProgressLabel from './progressLabelWidget';
import { GridList, GridTile } from 'material-ui/GridList';
import ReactTooltip from 'react-tooltip';


/**
 *
 * This class the component for rendering the events in the approval page.
 *
 */
const pw = 6;
const cw = pw / 2;
const tw = pw;
const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridList: {
        display: 'flex',
        overflowX: 'visible',
        margintop: '0px',
        marginleft: '0px',
    },
    titleStyle: {
        color: 'rgb(0, 188, 212)',
        height: 30
    },
};

class ProgressWidget extends Component {

    constructor(props) {
        super(props);
    }

    /**
     * This method gets the list of categories and their progress when the component is mounted.
     */

    componentDidMount = () => {
        this.props.getProgressCategoriesList(this.props.userInfo.id).then((response, error) => {
            this.props.updateProgressCategoriesInfo(JSON.parse(response.data));
        }, (error) => {
            console.log(error);
        });
    }

    /**
     * This method renders the progress bar.
     */
    renderProgressBar = (points, allLevels) => {
        let totalLevels = allLevels.length;
        let maxLevel = allLevels[totalLevels - 1];
        let maxPointsForCategory = maxLevel.pointsEndRange;
        let progress = (points / maxPointsForCategory) * 100;
        let pointProgress = 0;
        let levelProgress = 0;
        let currentLevel = "0";
        let pointsNeededForNextLevel = 0;
        let totalPointsForCurrentLevel = 0;
        let startLevelPoints = 0;
        let endLevelPoints = 0;
        allLevels.map((event, index) => {
            endLevelPoints = event.pointsEndRange;
            if (event.sequence === "1") {
                startLevelPoints = event.pointsEndRange;
            }
            if (parseInt(points) > parseInt(event.pointsStartRange) && parseInt(points) <= parseInt(event.pointsEndRange)) {
                currentLevel = event.sequence;
                pointsNeededForNextLevel = parseInt(event.pointsEndRange) - parseInt(points);
                totalPointsForCurrentLevel = parseInt(event.pointsEndRange);
            }
            if (parseInt(points) + 1 === parseInt(event.pointsStartRange)) {
                pointsNeededForNextLevel = parseInt(event.pointsEndRange) - parseInt(points);
                totalPointsForCurrentLevel = parseInt(event.pointsEndRange);
            }
        });

        if (currentLevel !== "0") {
            pointProgress = 100 - ((pointsNeededForNextLevel / totalPointsForCurrentLevel) * 100);
            if (points >= endLevelPoints) {
                levelProgress = ((currentLevel) / totalLevels) * 100;
            } else {
                levelProgress = ((currentLevel - 1) / totalLevels) * 100;
            }
        } else {
            pointProgress = "1";
            levelProgress = "1";
        }
        let msg = "";
        if (currentLevel === "0") {
            pointsNeededForNextLevel = startLevelPoints;
            msg = "You need " + pointsNeededForNextLevel + " points to reach level " + (parseInt(currentLevel) + 1)
        } else if (pointsNeededForNextLevel <= 0) {
            msg = "You have completed " + "Level " + (parseInt(currentLevel))
        } else {
            msg = "You need " + pointsNeededForNextLevel + " more points to reach level " + (parseInt(currentLevel))
        }

        return (
            <div className="m-nested">
                <div className="example">
                    <ProgressLabel
                        className="label-2"
                        progress={levelProgress}
                        progressWidth={pw}
                        trackWidth={tw}
                        cornersWidth={cw}
                        progressColor="#E08345"
                        trackColor="#E3E2DE"
                        fillColor="#E9E8E3"
                        size={100}
                        startDegree={0}>
                    </ProgressLabel>

                    <ProgressLabel
                        className="label-3"
                        progress={pointProgress}
                        progressWidth={pw}
                        trackWidth={tw}
                        cornersWidth={cw}
                        progressColor="#9ED1C5"
                        trackColor="#E3E2DE"
                        fillColor="#E9E8E3"
                        size={50}
                        startDegree={0}>
                    </ProgressLabel>
                </div>
            </div>
        );
    }

    /**
     * This method renders the categories and their progress.
     */
    renderProgressCategories = () => {

        return this.props.progressCategories.map((event, index) => {
            return (
                <div>
                    <GridTile key={index}>
                        {this.renderProgressBar(event.points, event.levels)}
                        <h4>{event.category.name}</h4>
                    </GridTile>
                </div>);
        });
    }

    /**
     * This method renders the categories and their progress.
     */
    render = () => {

        let progress = 50;
        return (
            <div>
                <div id="ViewEvent">
                    <div style={{"boxSizing": "border-box" , "color": "rgb(255, 255, 255)", "fontSize": "24px", "fontWeight": "300", "lineHeight": "48px", "paddingLeft": "16px", "width": "100%", "backgroundColor": "#f0ad4e", "borderRadius":"10px 10px 0 0", "text-align":"left" }}>Progress Widget</div>
                    <div className="inner-container">
                    <GridList style={styles.gridList} cols={2.2}>
                        {
                            this.props.progressCategories ? this.renderProgressCategories() : <div> </div>
                        }
                    </GridList>
                    </div>
                </div>
                <br></br><br></br>
                <i class="fa fa-adjust fa-1x" style={{ "color": "#E08345" }}>Level Progress</i>
                <br></br>
                <i class="fa fa-adjust fa-1x" style={{ "color": "#9ED1C5" }}>Point Progress</i>
            </div>
        )
    }
}
export default ProgressWidget;
