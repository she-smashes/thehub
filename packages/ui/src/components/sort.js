/**
 * @author Kriti Aggarwal
 * @name View Initiative
 * @desc renders view initiative page
 */

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Divider from 'material-ui/Divider';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

class Sort extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sortList: 'title',
            sortType: 'ascending'
        };
    }
    
    componentDidMount =  () => {
    }

    renderSortList = ( listName ) => {
        return listName.map((event, index) => {
            return <RadioButton 
            key={index}
            value = {event['value']}
            label = {event['name']}          
            />
        });
    }

    sortBy = (event) => {
        var value = event.target.value;
        var sortListValue;
        this.props.sortList.forEach(( item, index) => {
            if (item.value === value) {
                this.state.sortList = value;
                sortListValue = value;
            }
        });
        this.props.sortType.forEach(( item, index) => {
            if (item.value === value) {
                this.state.sortType = value;
            }
        });
        console.log(this.state)
        console.log(this.props.data)
        if ( this.state.sortType === 'ascending') {
            this.props.data.sort(function(a, b) {
                var nameA = a.sortListValue.toUpperCase(); 
                var nameB = b.sortListValue.toUpperCase(); 
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }      
                return 0;
            });
        } else if (this.state.sortType === 'descending') {
            this.props.data.sort(function(a, b) {
                var nameA = a.title.toUpperCase(); 
                var nameB = b.title.toUpperCase(); 
                if (nameA > nameB) {
                    return -1;
                }
                if (nameA < nameB) {
                    return 1;
                }      
                return 0;
            });
        }
        console.log("********")
        console.log(this.props.data);
    }

    render = () => {
        return (
            <div>
                <IconMenu iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}>                
                    <RadioButtonGroup name="sortList" onChange={(event) => this.sortBy(event)} defaultSelected="title">
                        { this.props.sortList ? this.renderSortList(this.props.sortList) : <div> </div> }
                    </RadioButtonGroup>
                    <Divider />
                    <RadioButtonGroup name="sortType" onChange={(event) => this.sortBy(event)} defaultSelected="ascending">
                        { this.props.sortType ? this.renderSortList(this.props.sortType) : <div> </div> }
                    </RadioButtonGroup>
                </IconMenu>
            </div>

        )
    }
}

export default Sort;
