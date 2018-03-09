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
import Slider from 'react-slick';
import _ from 'lodash';
import { StatefulToolTip } from "react-portal-tooltip"


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

        this.state = {

            categoryMap: {},

        };
    }

    /**
     * This method gets the list of categories and their progress when the component is mounted.
     */

    componentDidMount = () => {
        this.props.getCategories(this.props.userInfo).then((response, error) => {
            this.props.updateCategoriesList(JSON.parse(response.data));

            let catMap = {};
            this.props.categories.map((event, index) => {
                let key = event.type;
                if (key != '') {
                    if (catMap[key] === undefined) {
                        let catArr = [];
                        catArr.push(this.props.categories[index]);
                        catMap[key] = catArr;
                    } else {
                        let catArr = catMap[key];
                        delete catMap[key];
                        catArr.push(this.props.categories[index]);
                        catMap[key] = catArr;
                    }
                }
            });

            console.log(catMap);

            this.setState({
                categoryMap: catMap
            });
            this.props.getProgressCategoriesList(this.props.userInfo.id).then((response, error) => {
                this.props.updateProgressCategoriesInfo(JSON.parse(response.data));
                console.log(this.props.progressCategories);

            }, (error) => {
                console.log(error);
            });

        });

    }

    /**
     * This method renders the progress bar.
     */
    renderProgressBar = (categoryName, points, allLevels) => {
        if (points > 0) {            
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

            if (levelProgress === 0) {
                levelProgress = "1";
            }

            let msg = "";
            if (currentLevel === "0") {
                pointsNeededForNextLevel = startLevelPoints;
                msg = "You need " + pointsNeededForNextLevel + " points to reach level " + (parseInt(currentLevel) + 1)
            } else if (pointsNeededForNextLevel <= 0) {
                msg = "You have completed " + "Level " + (parseInt(currentLevel))
            } else {
                msg = "You need " + pointsNeededForNextLevel + " more points to complete level " + (parseInt(currentLevel));
            }
        }
        return (
            <div className="sub-category" id="categoryDisplay">
                <span>{categoryName}</span><div className={ (points ? 'highlight' : '')}><div className="display-circle"></div></div>
                              
                { console.log({points}) }
            </div>
        );
    }
    
    renderProgressCategories = () => {

        let catArr = Object.keys(this.state.categoryMap);
        
        return catArr.map((event, index) => {
            console.log("Category Name = " + event);
            console.log( JSON.stringify(this.state.categoryMap[event]));
            return <div className="cat-section">
                <div className="widget-header">{event}</div>
                <div className="inner-container">
                    { 
                    this.state.categoryMap[event].map((event1, index) => {
                        let foundProgress = false;
                        let progressCat = {};

                        this.props.progressCategories.map((event2, index) => {
                            if (event1.id === event2.category.id) {
                                foundProgress = true;
                                progressCat = event2;
                            }
                        });
                        if (foundProgress) {
                            console.log("Sub category progress = " + event1.name);                        
                            return this.renderProgressBar(event1.name, progressCat.points, progressCat.levels);

                        } else {
                            console.log("Sub category no progress = " + event1.name);
                            return this.renderProgressBar(event1.name, 0, null);

                        }
                    }) 
                }
                    
                </div>
            </div>            

        });

    }
    /**
     * This method renders the categories and their progress.
     */
    render = () => {

        let progress = 50;
        return (
            this.props.progressCategories && this.props.progressCategories.length > 0 ? this.renderProgressCategories() : <div> </div>

        )
    }
}
export default ProgressWidget;