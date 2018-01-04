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

    showDetails = (initiativeId) => {
        var element=React.createElement(
            'div'
        );
        this.props.viewInitiatives.map( (initiative) => {
            if (initiative.id === initiativeId){
                    element = (
                        <div>
                            <h1> Initiative Details </h1>
                            <p> <b> Title : </b> <span> { initiative.title } </span> </p>
                            <p> <b> Date : </b> <span> { initiative.createdOn } </span> </p>
                            <p> <b> Description : </b> <span> { initiative.description } </span> </p>
                        </div>
                    );
            }
        })
        ReactDOM.render(
            element,
            document.getElementById('initiativeDetails')
        );
    }

    renderInitiatives = () => {
        return this.props.viewInitiatives.map((initiative, index) => {
            return <ListItem
            key={index}
            primaryText={
                <div>
                    <Link to={`/initiativeDetails/${initiative.id}`}>{initiative.title}</Link>
                </div>
            }
            />
        })
    }

    render = () => {
        return (
            <div style={{color:"#000"}}>
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
