/**
 * @author Shalini Jha
 * @name BadgeWidget
 * @desc renders badge widget
 */

import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import {Link} from 'react-router-dom';
import {GridList, GridTile} from 'material-ui/GridList';
import ReactTooltip from 'react-tooltip';
import 'font-awesome/css/font-awesome.min.css';
import { StatefulToolTip } from "react-portal-tooltip";

const colors = {
    diamond: '#E57D70',
    platinum: '#606062',
    gold: '#D2AB46',
    silver: '#8E8E8E',
    bronze: '#B47E59',
}
const styles = {
    image1:{
        'width': '150%',
        'overflow': 'visible',
        'margin-top': '20px',
    },
    image2:{
        'width': '150%',
        'overflow': 'visible',
        'margin-top': '20px',
    },
    image3:{
        'width': '150%',
        'overflow': 'visible',
        'margin-top': '20px',
    },image4:{
        'width': '150%',
        'overflow': 'visible',
        'margin-top': '20px',
    },
    grid:{
        'overflow': 'visible',
    },
    link: {
        'color': 'rgb(99, 194, 222)',
        'float': 'right',
    },
}

class BadgeWidget extends Component {

    componentDidMount =  () => {
        this.props.getBadgesList(this.props.userInfo.id).then((response, error) => {
            this.props.updateBadgesInfo(JSON.parse(response.data));
          }, (error) => {
            console.log(error);
          });
    }

    /**
     * @name renderBadges
     * @desc Iterates through the list of the badges and renders the list of badges
     * @return Rendered badges list {HTML}
     */
    renderBadges = () => {
        return this.props.badges.map((userBadge, index) => {
            return (
                <div>
                    <GridTile  key={index} cols= {1} rows={1} style={styles.grid}>
                        {this.renderBadgeImage(userBadge)}
                    </GridTile>
                </div>
            );
        })
    }
    /**
     * This method renders the view events under category link.
     */
    showEventListForCatgoryLink = (categoryId) => {
        if(categoryId !== '') {
            return (
                <div>
                    <Link to={`/viewevents?categoryId=${categoryId}`}>View Events to score</Link>
                </div>
            );
        } else {
                <div></div>
        }
    }

    /**
     * This method renders the badge image.
     */
    renderImage = (color, classType, style, categoryId, tooltipMsg) => {
        
        const badge =  <div><i data-tip={tooltipMsg} class={classType} aria-hidden="true" style={{"color":colors[color]}}></i><b>{color}</b></div>
        return (     
            <div>  
                <StatefulToolTip parent={ badge }>
                    {tooltipMsg}
                    {this.showEventListForCatgoryLink(categoryId)}
                </StatefulToolTip>
            </div>
        );
    }
    renderBadgeImage = (userBadge) => {
        if(userBadge.badge.imageFileName === 'gold') {
            if(userBadge.userId !== undefined && userBadge.userId !== '') {
                return (
                    <div>
                        {this.renderImage('gold', 'fa fa-shield fa-4x', styles.image1, '' , 'You have earned the badge for participation in ' + userBadge.badge.level.category.name + ' category')}
                    </div>
                );
            } else {
                let msg = "";
                if(userBadge.pointsForNextLevel <= 0) {
                    msg =  'You can claim this badge in ' + userBadge.badge.level.category.name + ' category';
                } else {
                    msg = 'Earn ' + userBadge.pointsForNextLevel + ' more points to claim this badge in ' + userBadge.badge.level.category.name + ' category'
                }
                return (
                    <div>
                        {this.renderImage('gold', 'fa fa-lock fa-4x', styles.image1, userBadge.badge.level.categoryId , msg)}
                    </div>
                );
            }
        } else if(userBadge.badge.imageFileName === 'silver') {
            if(userBadge.userId !== undefined && userBadge.userId !== '') {
                return (
                    <div>
                        {this.renderImage('silver', 'fa fa-shield fa-4x', styles.image2, '', 'You have earned the badge for participation in ' + userBadge.badge.level.category.name + ' category')}
                    </div>
                );
            } else {
                let msg = "";
                if(userBadge.pointsForNextLevel <= 0) {
                    msg =  'You can claim this badge in ' + userBadge.badge.level.category.name + ' category';
                } else {
                    msg = 'Earn ' + userBadge.pointsForNextLevel + ' more points to claim this badge in ' + userBadge.badge.level.category.name + ' category'
                }
                return (
                    <div>
                        {this.renderImage('silver', 'fa fa-lock fa-4x', styles.image2, userBadge.badge.level.categoryId , msg)}
                    </div>
                );
            }
        } else if(userBadge.badge.imageFileName === 'bronze') {
            if(userBadge.userId !== undefined && userBadge.userId !== '') {
                return (
                    <div>
                        {this.renderImage('bronze', 'fa fa-shield fa-4x', styles.image3, '', 'You have earned the badge for participation in ' + userBadge.badge.level.category.name + ' category')}
                    </div>
                );
            } else {
                let msg = "";
                if(userBadge.pointsForNextLevel <= 0) {
                    msg =  'You can claim this badge in ' + userBadge.badge.level.category.name + ' category';
                } else {
                    msg = 'Earn ' + userBadge.pointsForNextLevel + ' more points to claim this badge in ' + userBadge.badge.level.category.name + ' category'
                }
                return (
                    <div>
                        {this.renderImage('bronze', 'fa fa-lock fa-4x', styles.image3, userBadge.badge.level.categoryId , msg)}
                    </div>
                );
            }
        } else if(userBadge.badge.imageFileName === 'platinum') {
            if(userBadge.userId !== undefined && userBadge.userId !== '') {
                return (
                    <div>
                        {this.renderImage('platinum', 'fa fa-shield fa-4x', styles.image4, '', 'You have earned the badge for participation in ' + userBadge.badge.level.category.name + ' category')}
                    </div>
                );
            } else {
                let msg = "";
                if(userBadge.pointsForNextLevel <= 0) {
                    msg =  'You can claim this badge in ' + userBadge.badge.level.category.name + ' category';
                } else {
                    msg = 'Earn ' + userBadge.pointsForNextLevel + ' more points to claim this badge in ' + userBadge.badge.level.category.name + ' category'
                }
                return (
                    <div>
                        {this.renderImage('platinum', 'fa fa-lock fa-4x', styles.image4, userBadge.badge.level.categoryId, msg)}
                    </div>
                );
            }
        }

    }
    /**
     * This method renders the badges that the user has and the default badges.
     */
    render = () => {
        return (
            <div>
                <div  className="widget-header">My Badges</div>
                <div  className="inner-container">
                <GridList cols={6} cellHeight='180px' style={{"align": "center"}}>
                    {(this.props.badges != undefined && this.props.badges.length>0)?this.renderBadges():<div></div>}
                </GridList>

                <br>
                </br>
                <Link to={`/viewallbadges`} style={styles.link}>View All Badges</Link>
                </div>
            </div>

        )
    }
}

export default BadgeWidget;
