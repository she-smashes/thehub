/**
 * @author Shalini Jha
 * @name BadgeWidget
 * @desc renders badge widget
 */

import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import { Link } from 'react-router-dom';

import { GridList, GridTile } from 'material-ui/GridList';
import gold from '../images/gold.png';
import silver from '../images/silver.png';
import platinum from '../images/platinum.png';
import bronze from '../images/bronze.png';
import goldLocked from '../images/gold-lock.png';
import silverLocked from '../images/silver-lock.png';
import platinumLocked from '../images/platinum-lock.png';
import bronzeLocked from '../images/bronze-lock.png';


const styles = {
    image: {
        'width': '40%!important',
        'margin-top': '100px',
    },
    grid: {
        'overflow': 'visible',
        'width': '40%!important',
    },
    border: {
        'width': '50%',
        'margin-left': '25%',
    }
}


class ViewAllBadges extends Component {


    componentDidMount = () => {
        this.props.getAllBadgesList(this.props.userInfo.id).then((response, error) => {
            console.log(response);
            this.props.updateAllBadgesInfo(JSON.parse(response.data));
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
        if (this.props.badges != undefined) {
            return Object.keys(this.props.badges).map((key, index) => {
                let userBadges = this.props.badges[key];
                return (
                    <GridList cols={6} cellHeight='180px' >
                        <GridTile key={index} cols={6} rows={1} style={styles.grid}>
                        {userBadges[0].badge.level.category.name}
                        </GridTile>
                        {this.renderCategoryBadges(userBadges)}
                    </GridList>
                );
            });
        }

    }

    renderCategoryBadges = (userBadges) => {

        return userBadges.map((userBadge, index) => {
            return (
                <div key={index}>
                    <GridTile key={index} cols={1} rows={1} style={styles.grid}>
                        {this.renderBadgeImage(userBadge)}
                    </GridTile>
                </div>
            );
        })


    }

    renderBadgeImage = (userBadge) => {

        if (userBadge.badge.imageFileName === 'gold') {
            if (userBadge.userId !== undefined && userBadge.userId !== '') {
                return (
                    <img src={gold} style={styles.image} />
                );
            } else {
                return (
                    <img src={goldLocked} style={styles.image} />
                );
            }
        } else if (userBadge.badge.imageFileName === 'silver') {
            if (userBadge.userId !== undefined && userBadge.userId !== '') {
                return (
                    <img src={silver} style={styles.image} />
                );
            } else {
                return (
                    <img src={silverLocked} style={styles.image} />
                );
            }
        } else if (userBadge.badge.imageFileName === 'bronze') {
            if (userBadge.userId !== undefined && userBadge.userId !== '') {
                return (
                    <img src={bronze} style={styles.image} />
                );
            } else {
                return (
                    <img src={bronzeLocked} style={styles.image} />
                );
            }
        } else if (userBadge.badge.imageFileName === 'platinum') {
            if (userBadge.userId !== undefined && userBadge.userId !== '') {
                return (
                    <img src={platinum} style={styles.image} />
                );
            } else {
                return (
                    <img src={platinumLocked} style={styles.image} />
                );
            }
        }

    }

    render = () => {
        return (
            <div style={styles.border}>
                <h3>List of Badges</h3>
                {(this.props.badges != undefined) ? this.renderBadges() : <div></div>}
            </div>

        )
    }
}

export default ViewAllBadges;
