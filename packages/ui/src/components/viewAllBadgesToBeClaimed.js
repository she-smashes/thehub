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
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

const paperStyle = {
    height: 200,
    width: '500px',
    margin: 20,
    align: 'center',
    display: 'inline-block',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '60px',
    marginTop: '77px',
  };
const colors = {
    diamond: '#E57D70',
    platinum: '#606062',
    gold: '#D2AB46',
    silver: '#8E8E8E',
    bronze: '#B47E59',
}
const styles = {
    grid: {
        'overflow': 'visible',
        'width': '40%!important',
    },
    gridTile: {
        'marginTop': '50px',
        'width': '210px',
    },
    gridClaimTile: {
        'marginTop': '50px'
    }
}

class ViewAllBadgesToBeClaimed extends Component {
    constructor(props) {
        super(props);
        this.state = {
          claimedBadges: []
        }
      }
    
    componentDidMount =  () => {
        this.props.getBadgesToBeClaimedList(this.props.userInfo.id).then((response, error) => {
            this.props.updateBadgesToBeClaimedInfo(JSON.parse(response.data));    
          }, (error) => {
            console.log(error);
          });
    }
    claimBadge = (badgeId) => {
        this.props.claimBadge(badgeId, this.props.userInfo).then((response, error) => {
            console.log(response);
            let userBadgeId = JSON.parse(response.data).id;
            if(userBadgeId !== undefined && userBadgeId !== '') {
                console.log(userBadgeId);
                let claimedBadges = this.state.claimedBadges;
                claimedBadges.push(badgeId);
                this.setState({
                    claimedBadges: claimedBadges
                  });
            }
        }, (error) => {
          console.log(error);
        });
      }
      showClaimData = (claimBadge) => {
        if(this.state.claimedBadges.indexOf(claimBadge.id) <= -1) {
            return (
                
                <div className="button-line">
                    <RaisedButton type="button" label="Claim Your Badge" primary  onClick={() => { this.claimBadge(claimBadge.id) }} />
                </div>
              );
        } else {
            return (
                this.showClaimMessage()
            );
        }
          
      }
      showClaimMessage = () => {
        return (
            <div style={{"color":"green"}}>
                <b>
                    Congrats!! You have successfully claimed your badge.
                </b>
            </div>
        );
    }
    /**
     * @name renderBadges
     * @desc Iterates through the list of the badges and renders the list of badges
     * @return Rendered badges list {HTML}
     */
    renderBadges = () => {
        return this.props.badgesToBeClaimedList.map((claimBadge, index) => {
            console.log(claimBadge);
            return (
                <div>
                    <GridTile  key={index} style={styles.grid}> 
                        <Paper style={paperStyle} zDepth={1} rounded={false} >
                            <GridList cols={2}>
                                <GridTile  cols={1} rows={1} key={index} style={styles.gridTile}> 
                                    {this.renderBadgeImage(claimBadge)}
                                </GridTile>
                                <GridTile    cols={1} rows={1} key={index} style={styles.gridTile}> 
                                    <b>Category:</b> {claimBadge.level.category.name}
                                    <br></br>
                                    <b>Badge Name:</b> {claimBadge.description}
                                    <br></br>
                                    <b>Level:</b> {claimBadge.level.name}
                                    <br></br>
                                    <br></br>
                                    {this.showClaimData(claimBadge)}                                   
                                </GridTile>
                            </GridList>
                        </Paper>
                    </GridTile>
                </div>
            );
        })
    }
    
    renderImage = (color, classType) => {
        
        const badge =  <i class={classType} aria-hidden="true" style={{"color":color}}></i>
        return (     
            <div>  
                { badge }     
            </div>
        );
    }
    renderBadgeImage = (claimBadge) => {
        if(claimBadge.imageFileName === 'gold') {
            return (
                <div>
                    {this.renderImage(colors.gold, 'fa fa-shield fa-4x')}
                </div>
            );
        } else if(claimBadge.imageFileName === 'silver') {
            return (
                    <div>
                        {this.renderImage(colors.silver, 'fa fa-shield fa-4x')}
                    </div>
                );
            
        } else if(claimBadge.imageFileName === 'bronze') {
                return (
                    <div>
                        {this.renderImage(colors.bronze, 'fa fa-shield fa-4x')}
                    </div>
                );
           
        } else if(claimBadge.imageFileName === 'platinum') {
                return (
                    <div>
                        {this.renderImage(colors.platinum, 'fa fa-shield fa-4x')}
                    </div>
                );
            
        } else if(claimBadge.imageFileName === 'diamond') {
            return (
                <div>
                    {this.renderImage(colors.diamond, 'fa fa-shield fa-4x')}
                </div>
            );
    }
   
    }

    render = () => {
        
        return (
            <div>
                <GridList cols={2} cellHeight='180px' style={{"align": "center"}}>
                    {(this.props.badgesToBeClaimedList != undefined && this.props.badgesToBeClaimedList.length>0)?this.renderBadges():<div></div>}
                </GridList>
                <br>
                </br>
            </div>

        )
    }
}

export default ViewAllBadgesToBeClaimed;

