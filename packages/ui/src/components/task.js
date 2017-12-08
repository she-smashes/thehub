/**
 * @author Uma Govindaraj
 * @name View Tasks
 * @desc renders view tasks page
 */

import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import { List, ListItem } from 'material-ui/List';
// import Divider from 'material-ui/Divider';
import { Accordion, AccordionItem } from 'react-sanfona';
import './accordian.css';
import RaisedButton from 'material-ui/RaisedButton';
import Moment from 'moment';
import { DEFAULT_TASKS } from "../constants/actions";
import { APPROVE_TASK } from "../constants/actions";

/**
 *
 * This class the component for rendering the task in the approval page.
 *
 */

class Task extends Component {

    /**
     * This method invokes the approveTask action.
     */
    processForm = (taskId) => {
        this.props.approveTask(this.props.userInfo.id, taskId).then((response, error) => {
            this.props.updateTaskInfo(APPROVE_TASK, JSON.parse(response.data));
          }, (error) => {
            console.log(error);
          });
    }

    /**
     * This method invokes the gets the list of tasks when the component is mounted.
     */

    componentDidMount = () => {
        this.props.getTaskList(this.props.userInfo.id).then((response, error) => {
            this.props.updateTaskInfo(DEFAULT_TASKS, JSON.parse(response.data).pendingTasks);
          }, (error) => {
            console.log(error);
          });
    }

    /**
     * This method renders the list of tasks in an accordion format.
     */
    renderTasks = () => {

        return (
            <Accordion class="react-sanfona">
                {this.props.viewTasks.map(item => {
                        return (
                            <AccordionItem class="react-sanfona-item" title={item.approvable.title} key={item.id}>
                                <b>Type: </b> {item.type}
                                <br /> <br />
                                <b>Date & Time: </b> {Moment(item.approvable.startDate).format('LL') + " - " + Moment(item.approvable.endDate).format('LL')}
                                <br /> <br />
                                <b>Location: </b> {item.approvable.location}
                                <br /> <br />
                                <div>
                                <b>Description: </b>
                                <p className="" dangerouslySetInnerHTML={{ __html: item.approvable.description}}/>
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
                <h3></h3>
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
