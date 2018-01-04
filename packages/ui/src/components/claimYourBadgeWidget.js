/**
 * @author Shalini Jha
 * @name Claim Your Badge Badge Widget
 * @desc renders claim your badge widget
 */

import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import { Link } from 'react-router-dom';
import { GridList, GridTile } from 'material-ui/GridList';
import ReactTooltip from 'react-tooltip';
import 'font-awesome/css/font-awesome.min.css';
import { StatefulToolTip } from "react-portal-tooltip";
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import congratulations from '../images/congratulations.jpg';


const background = {
    'background-image': congratulations,
};
const img = {
    'align-items': 'center',

};
class ClaimYourBadgeWidget extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        this.props.getBadgesToBeClaimedList(this.props.userInfo.id).then((response, error) => {
            this.props.updateBadgesToBeClaimedInfo(JSON.parse(response.data));
        }, (error) => {
            console.log(error);
        });
    }

    /**
     * @name renderBadges
     * @desc Shows the banner saying congratulations.
     * @return congratulations banner {HTML}
     */
    renderBadges = () => {
        return (
            <div>
                <Link to={`/viewallbadgestobeclaimed`}>
                    <img src={congratulations} style={{ 'align-items': 'center' }} />
                </Link>
            </div>
        );
    }

    /**
     * @name render
     * @desc Checks if there any badges to be claimed and shows the banner saying congratulations.
     * @return congratulations banner {HTML}
     */
    render = () => {
        return (
            <div>
                {(this.props.badgesCanBeClaimedList != undefined && this.props.badgesCanBeClaimedList.length > 0) ? this.renderBadges() : <div>Claim your badge!</div>}
            </div>
        )
    }
}

export default ClaimYourBadgeWidget;
