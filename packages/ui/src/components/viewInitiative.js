/**
 * @author Kriti Aggarwal
 * @name View Initiative
 * @desc renders view initiative page
 */

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {List, ListItem} from 'material-ui/List';
import {Link} from 'react-router-dom';

class ViewInitiative extends Component {

    componentDidMount =  () => {
        this.props.getInitiativeList(this.props.userInfo.id).then((response, error) => {
            this.props.updateViewInitiativeInfo(JSON.parse(response.data));
          }, (error) => {
            console.log(error);
          });
    }

    renderInitiatives = () => {
        return this.props.viewInitiatives.map((initiative, index) => {
            return <ListItem
            key={index}
            primaryText={
                <div>
                    <i class="fa fa-bullhorn" aria-hidden="true"></i>
                    <Link to={`/initiativeDetails/${initiative.title}`}>{initiative.title}</Link>
                </div>
            }
            />
        })
    }

    render = () => {
        return (
          <div className="widget list-data well hub-widget">
          <div className="widget-header">View Initiatives</div>
                <div id="initiativeDetails">
                <List>
                    { this.props.viewInitiatives? this.renderInitiatives() : <div> </div> }
                </List>
                </div>
            </div>

        )
    }
}

export default ViewInitiative;
