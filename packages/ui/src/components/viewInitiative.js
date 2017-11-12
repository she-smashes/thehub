/**
 * @author Kriti Aggarwal
 * @name View Initiative
 * @desc renders view initiative page
 */

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {List, ListItem} from 'material-ui/List';
class ViewInitiative extends Component {

    componentDidMount =  () => {
        console.log(this.props.userInfo.id);
        this.props.getInitiativeList(this.props.userInfo.id);
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
        return this.props.viewInitiatives.map((event, index) => {
            return <ListItem
            key={index}
            primaryText={event.title}
            onClick= {() => this.showDetails(event.id)}
            />
        })
    }

    render = () => {
      console.log(this.props)
        return (
            <div>
                <h3>List of Initiatives </h3>
                <List>
                    { this.props.viewInitiatives? this.renderInitiatives() : <div> </div> }
                </List>
                {/* { this.showDetails(1) } */}
                <div id="initiativeDetails"></div>
            </div>

        )
    }
}

export default ViewInitiative;
