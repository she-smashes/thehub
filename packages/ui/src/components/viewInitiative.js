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
                    <Link to={`/initiativeDetails/${initiative.id}`}>{initiative.title}</Link>
                </div>
            }
            />
        })
    }

    render = () => {
        return (
            <div className="list-data">
                <h3>List of Initiatives </h3>
                <List>
                    { this.props.viewInitiatives? this.renderInitiatives() : <div> </div> }
                </List>
                <div id="initiativeDetails"></div>
            </div>

        )
    }
}

export default ViewInitiative;
