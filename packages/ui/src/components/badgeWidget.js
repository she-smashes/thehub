/**
 * @author Shalini Jha
 * @name BadgeWidget
 * @desc renders badge widget
 */

import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import {Link} from 'react-router-dom';
import {GridList, GridTile} from 'material-ui/GridList';
import gold from '../images/gold.png';
import silver from '../images/silver.png';
import platinum from '../images/platinum.png';
import bronze from '../images/bronze.png';
import goldLocked from '../images/gold-lock.png';
import silverLocked from '../images/silver-lock.png';
import platinumLocked from '../images/platinum-lock.png';
import bronzeLocked from '../images/bronze-lock.png';
import ReactTooltip from 'react-tooltip';

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
    
    showEventListForCatgoryLink = (categoryId) => {
        if(categoryId !== '') {
            return (     
                <div>
                    <Link to={`/viewevents?${categoryId}`}>View Events to score</Link>
                </div>
            );
        } else {
                <div>
                </div>
        }
       
    }

    renderImage = (src, style, categoryId, tooltipMsg) => {
        return (     
            <div>  
                <img data-tip={tooltipMsg} src={src} style={style}/>
                {this.showEventListForCatgoryLink(categoryId)}
                <ReactTooltip place="bottom" type="success" effect="float"/>            
            </div>
        );
    }
    renderBadgeImage = (userBadge) => {
        if(userBadge.badge.imageFileName === 'gold') {
            if(userBadge.userId !== undefined && userBadge.userId !== '') {
                return (
                    <div>
                        {this.renderImage(gold, styles.image1, '' , 'You have earned the badge for participation in ' + userBadge.badge.level.category.name + ' category')}
                    </div>
                );
            } else {
                return (
                    <div>
                        {this.renderImage(goldLocked, styles.image1, userBadge.badge.level.categoryId , 'Earn ' + userBadge.pointsForNextLevel + ' more points to claim this badge')}
                    </div>
                );
            }
        } else if(userBadge.badge.imageFileName === 'silver') {
            if(userBadge.userId !== undefined && userBadge.userId !== '') {
                return (
                    <div>
                        {this.renderImage(silver, styles.image2, '', 'You have earned the badge for participation in ' + userBadge.badge.level.category.name + ' category')}
                    </div>
                );
            } else {
                return (
                    <div>
                        {this.renderImage(silverLocked, styles.image2, userBadge.badge.level.categoryId , 'Earn ' + userBadge.pointsForNextLevel + ' more points to claim this badge')}
                    </div>
                );
            }
        } else if(userBadge.badge.imageFileName === 'bronze') {
            if(userBadge.userId !== undefined && userBadge.userId !== '') {
                return (
                    <div>
                        {this.renderImage(bronze, styles.image3, '', 'You have earned the badge for participation in ' + userBadge.badge.level.category.name + ' category')}
                    </div>
                );
            } else {
                return (
                    <div>
                        {this.renderImage(bronzeLocked, styles.image3, userBadge.badge.level.categoryId , 'Earn ' + userBadge.pointsForNextLevel + ' more points to claim this badge')}
                    </div>
                );
            }
        } else if(userBadge.badge.imageFileName === 'platinum') {
            if(userBadge.userId !== undefined && userBadge.userId !== '') {
                return (
                    <div>
                        {this.renderImage(platinum, styles.image4, '', 'You have earned the badge for participation in ' + userBadge.badge.level.category.name + ' category')}
                    </div>
                );
            } else {
                return (
                    <div>
                        {this.renderImage(platinumLocked, styles.image4, userBadge.badge.level.categoryId, 'Earn ' + userBadge.pointsForNextLevel + ' more points to claim this badge')}
                    </div>
                );
            }
        }
   
    }

    render = () => {
        return (
            <div>
               
                <GridList cols={6} cellHeight='180px' >
                    {(this.props.badges != undefined && this.props.badges.length>0)?this.renderBadges():<div></div>}
                </GridList>
                <br>
                </br>
                <Link to={`/viewallbadges`}>View All Badges</Link>
            </div>

        )
    }
}

export default BadgeWidget;
