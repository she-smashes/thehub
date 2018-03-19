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
import { StatefulToolTip } from "react-portal-tooltip";
import Progress from 'react-progressbar';

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
            categoryMap: {}
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
            this.setState({
                categoryMap: catMap
            });
            this.props.getProgressCategoriesList(this.props.userInfo.id).then((response, error) => {
                this.props.updateProgressCategoriesInfo(JSON.parse(response.data));
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
                msg = "(" + pointsNeededForNextLevel + " points more for next level" + (parseInt(currentLevel) + 1) + ")";
            } else if (pointsNeededForNextLevel <= 0) {
                msg = "You have completed " + "Level " + (parseInt(currentLevel))
            } else {
                msg = "(" + pointsNeededForNextLevel + "  points more for next level" + (parseInt(currentLevel)) + ")";
            }
            return (
                <div className="progress-display">
                    <Progress completed={progress} />
                    <div className="points">
                        <div>Points - {points}</div>
                        <div className="msg">{msg}</div>
                    </div>
                </div>

            );
        }

    }
    renderProgressCategories = () => {
        let catArr = Object.keys(this.state.categoryMap);
        let foundProgress1;

        var settings = {
            arrows: true,
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            centerPadding: '70px'
        };


        let progressCat = {};
        return catArr.map((eventName, index) => {
            let foundProgress = false;
            let rows = _.chunk(this.state.categoryMap[eventName], 3);

            return <div className="cat-section">
                <div className="widget-header">
                    {eventName}
                    {
                        Object.keys(this.props.progressCategories.userBadges).map((eventBadgeCategory, index) => {
                            console.log(this.props.progressCategories.userBadges[eventBadgeCategory]);
                            if (this.props.progressCategories.userBadges[eventBadgeCategory][0] !== undefined)
                                if (eventName !== this.props.progressCategories.userBadges[eventBadgeCategory][0].badge.level.category.name) {
                                    console.log("no category name match");
                                } else {
                                    let foundBadge = false;
                                    let badgeDesc = "";
                                    let prevSequence = 0;
                                    let currentSequence = 0;
                                    this.props.progressCategories.userBadges[eventBadgeCategory].map((eventCategoryBadge, index) => {
                                        if (eventName === eventCategoryBadge.badge.level.category.name) {
                                            currentSequence = eventCategoryBadge.badge.level.sequence;
                                            if (currentSequence > prevSequence) {
                                                prevSequence = currentSequence;
                                                badgeDesc = eventCategoryBadge.badge.title;
                                            }
                                        }
                                    });
                                    console.log("Got " + badgeDesc +  " in " + eventName + "category.");
                                }
                        })
                    }
                </div>
                <div className="inner-container">
                    <Slider {...settings}>
                        {
                            rows.map((row) => (
                                <div className="rows">
                                    {
                                        row.map((event1, index) => (
                                            foundProgress1 = false,
                                            this.props.progressCategories.userCategories.map((event2, index) => {
                                                if (event1.id === event2.category.id) {
                                                    foundProgress1 = true;
                                                }

                                            }),
                                            <div className="sub-category">
                                                <div className={"sub-cat-name " + (foundProgress1 ? 'subcat-highlight' : '')}>{event1.name}</div><div className={(foundProgress1 ? 'highlight' : '')}><div className="display-circle"></div></div>
                                            </div>
                                        ))

                                    }
                                </div>
                            ))
                        }
                    </Slider>
                    {
                        (this.props.progressCategories.userCategories).map((event2, index) => {
                            if (eventName === event2.category.name) {
                                foundProgress = true;
                                progressCat = event2;
                            }
                        })
                    }
                    {
                        foundProgress && this.renderProgressBar(eventName.name, progressCat.points, progressCat.levels)
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
            this.props.progressCategories.userCategories && this.props.progressCategories.userCategories.length > 0 ? this.renderProgressCategories() : <div> </div>
        )
    }
}
export default ProgressWidget;
