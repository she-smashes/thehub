/**
 * @author Shalini Jha
 * @name BadgeWidget
 * @desc renders badge widget
 */

import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import { Link } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import { GridList, GridTile } from 'material-ui/GridList';
import Paper from 'material-ui/Paper';

const paperStyle = {
    height: '120px',
    width: '500px',
    margin: 20,
    align: 'center',
    display: 'flex',
};

const colors = {
    diamond: '#E57D70',
    platinum: '#606062',
    gold: '#D2AB46',
    silver: '#8E8E8E',
    bronze: '#B47E59',
}
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
                    <div className="badge-container">
                    <GridList cols={6} cellHeight='180px' >
                        <GridTile key={index} cols={6} rows={1} >
                            <b className="textAlignLeft pad20">{userBadges[0].badge.level.category.name}</b>
                        </GridTile>
                        <Paper className="badge-container" style={paperStyle} zDepth={1} rounded={false} >
                            {this.renderCategoryBadges(userBadges)}
                        </Paper>
                    </GridList>
                    </div>
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
        });
    }
    renderBadgeImage = (userBadge) => {

        if (userBadge.badge.imageFileName === 'gold') {
            if (userBadge.userId !== undefined && userBadge.userId !== '') {
                return (
                    <div><i class="fa fa-shield fa-4x shield-style" aria-hidden="true" style={{ "color": colors.gold }}></i><br></br><b className="shield-style">gold</b></div>
                );
            } else {
                return (
                    <div><i class="fa fa-lock fa-4x shield-style" aria-hidden="true" style={{ "color": colors.gold }}></i><br></br><b className="shield-style">gold</b></div>
                );
            }
        } else if (userBadge.badge.imageFileName === 'silver') {
            if (userBadge.userId !== undefined && userBadge.userId !== '') {
                return (
                    <div><i class="fa fa-shield fa-4x shield-style" aria-hidden="true" style={{ "color": colors.silver }}></i><br></br><b className="shield-style">silver</b></div>
                );
            } else {
                return (
                    <div><i class="fa fa-lock fa-4x shield-style" aria-hidden="true" style={{ "color": colors.silver }}></i><br></br><b className="shield-style">silver</b></div>
                );
            }
        } else if (userBadge.badge.imageFileName === 'bronze') {
            if (userBadge.userId !== undefined && userBadge.userId !== '') {
                return (
                    <div><i class="fa fa-shield fa-4x shield-style" aria-hidden="true" style={{ "color": colors.bronze }}></i><br></br><b className="shield-style">bronze</b></div>
                );
            } else {
                return (
                    <div> <i class="fa fa-lock fa-4x shield-style" aria-hidden="true" style={{ "color": colors.bronze }}></i><br></br><b className="shield-style">bronze</b></div>
                );
            }
        } else if (userBadge.badge.imageFileName === 'platinum') {
            if (userBadge.userId !== undefined && userBadge.userId !== '') {
                return (
                    <div><i class="fa fa-shield fa-4x shield-style" aria-hidden="true" style={{ "color": colors.platinum }}></i><br></br><b className="shield-style">platinum</b></div>
                );
            } else {
                return (
                    <div>  <i class="fa fa-lock fa-4x shield-style" aria-hidden="true" style={{ "color": colors.platinum }}></i><br></br><b className="shield-style">platinum</b></div>
                );
            }
        } else if (userBadge.badge.imageFileName === 'diamond') {
            if (userBadge.userId !== undefined && userBadge.userId !== '') {
                return (
                    <div> <i class="fa fa-shield fa-4x shield-style" aria-hidden="true" style={{ "color": colors.diamond }}></i><br></br><b className="shield-style">diamond</b></div>
                );
            } else {
                return (
                    <div><i class="fa fa-lock fa-4x shield-style" aria-hidden="true" style={{ "color": colors.diamond }}></i><br></br><b className="shield-style">diamond</b></div>
                );
            }
        }

    }

    render = () => {
        return (
            <div className="widget well all-badges">
                <div  className="widget-header">My Badges</div>
                {(this.props.badges != undefined) ? this.renderBadges() : <div></div>}
            </div>

        )
    }
}

export default ViewAllBadges;
