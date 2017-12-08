/**
 * @author Kriti Aggarwal
 * @name Filter Component
 * @desc renders filter component
 */

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Divider from 'material-ui/Divider';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

class Filter extends Component {

    constructor(props) {
        super(props);
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
    }

    render = () => {
        return (
            <div>
                <IconMenu iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}> 
                    <MenuItem
                        primaryText="Location"
                        rightIcon={<ArrowDropRight />}
                        menuItems= {[
                            <RadioButtonGroup name="location" >
                                <RadioButton 
                                    value = "Noida"
                                    label = "Noida"
                                />
                                <RadioButton 
                                    value = "Bangalore"
                                    label = "Bangalore"
                                />
                                <RadioButton 
                                    value = "Gurgaon"
                                    label = "Gurgaon"
                                />
                            </RadioButtonGroup>
                        ]}
                        />
                    <Divider />
                    <MenuItem
                        primaryText="Status"
                        rightIcon={<ArrowDropRight />}
                        menuItems={[
                            <RadioButtonGroup name="status" >
                            <RadioButton 
                                value = "Approved"
                                label = "Approved"
                            />
                            <RadioButton 
                                value = "Not Approved"
                                label = "Not Approved"
                            />
                            </RadioButtonGroup>
                        ]}
                        />
                </IconMenu>
            </div>

        )
    }
}

export default Filter;
