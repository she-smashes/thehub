/**
 * @author Uma Govindaraj
 * @name View Tasks
 * @desc renders view tasks page
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { Accordion, AccordionItem } from 'react-sanfona';
import './accordian.css';
import RaisedButton from 'material-ui/RaisedButton';

class Task extends Component {

    processForm = (taskId) => {
        console.log('taskId', taskId);
        this.props.approveTask(this.props.userInfo.id, taskId);
    }

    componentDidMount = () => {
        console.log('rrrrrrrrrrrrrrrrrrrr' + this.props.userInfo.id);
        this.props.getTaskList(this.props.userInfo.id);
    }

    renderTasks = () => {

        
        return (
            <Accordion class="react-sanfona">
                {this.props.viewTasks.map(item => {


                        return (
                            <AccordionItem class="react-sanfona-item" title={item.approvable.title} key={item.id}>
                                
                                    <div>
                                    {item.approvable.description} 
                                    </div>

                                    <br /> <br />
                                    <div className="button-line">
                                        <RaisedButton type="submit" label="APPROVE" primary  key={item.id} onClick={()=>{this.processForm(item.id)}}/>
                                    </div>
                                
                            </AccordionItem>
                        );
                    
                })}
            </Accordion>
        );
    }

    render = () => {
        return (
            <div>
                <h3>List of Tasks </h3>
                <div id="taskAccordian">
                    {this.props.viewTasks ? this.renderTasks() : <div> </div>}
                </div>
                {/* { this.showDetails(1) } */}
                <div id="taskDetails"></div>
            </div>

        )
    }
}

export default Task;
