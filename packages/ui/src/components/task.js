/**
 * @author Uma Govindaraj
 * @name View Tasks
 * @desc renders view tasks page
 */

import React, { Component } from 'react';
import { Accordion, AccordionItem } from 'react-sanfona';
import './accordian.css';
import RaisedButton from 'material-ui/RaisedButton';
import Moment from 'moment';
import { DEFAULT_TASKS } from "../constants/actions";
import { APPROVE_TASK } from "../constants/actions";
import {Link} from 'react-router-dom';


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
            if(this.props.userInfo.allowedActionList.indexOf('task_count')) {
                let notificationCount = 0;
                if(this.props.userInfo.notificationCount !== undefined && 
                    this.props.userInfo.notificationCount !== null ||
                    this.props.userInfo.notificationCount !== '') {
                    notificationCount = this.props.userInfo.notificationCount;
                }
                this.props.userInfo.notificationCount = parseInt(notificationCount) - 1;
                let userString = JSON.stringify(this.props.userInfo)
                this.props.updateUserInfo(JSON.parse(userString));
            }
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

    renderEventTask = (item) => {
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
                    <p className="" dangerouslySetInnerHTML={{ __html: item.approvable.description }} />
                </div>
                <br /> <br />
                <div className="button-line">
                    <RaisedButton type="submit" label="APPROVE" primary key={item.id} onClick={() => { this.processForm(item.id) }} />
                </div>
            </AccordionItem>
        );
    }

    renderInitiativeTask = (item) => {
        return (
            <AccordionItem class="react-sanfona-item" title={item.approvable.title} key={item.id}>
                <b>Type: </b> {item.type}
                <br /> <br />
                <div>
                    <b>Description: </b>
                    <p className="" dangerouslySetInnerHTML={{ __html: item.approvable.description }} />
                </div>
                <br /> <br />
                <div className="button-line">
                    <RaisedButton type="submit" label="APPROVE" primary key={item.id} onClick={() => { this.processForm(item.id) }} />
                </div>
            </AccordionItem>
        );
    }

    renderEnrollmentTask = (item) => {
        console.log(item);
        let title =  "Attendance Approval for "  + item.approvable.title;
        return (
            <AccordionItem class="react-sanfona-item" title={title} key={item.id}>
                <div>
                    <b>Event Title: </b> {item.approvable.title}
                    <br /> <br />

                    <b>Event Date & Time: </b> {Moment(item.approvable.startDate).format('LL') + " - " + Moment(item.approvable.endDate).format('LL')}
                    <br /> <br />
                    <b>Event Location: </b> {item.approvable.location}
                    <br /> <br />
                    <div>
                        <b>Event Description: </b>
                        <p className="" dangerouslySetInnerHTML={{ __html: item.approvable.description }} />
                    </div>
                    <Link to={`/uploadattendance/${item.approvable.id}`}>View Uploaded Attendance</Link>
                </div>
                <br />
                <div className="button-line">
                    <RaisedButton type="submit" label="APPROVE" primary key={item.id} onClick={() => { this.processForm(item.id) }} />
                </div>
            </AccordionItem>
        );
    }

    /**
     * This method renders the list of tasks in an accordion format.
     */
    renderTasks = () => {

        return (
            <Accordion class="react-sanfona">
                {
                    this.props.viewTasks.map(item => {
                        if(item.type === 'event') {
                            return this.renderEventTask(item);
                        } else if(item.type === 'initiative') {
                            return this.renderInitiativeTask(item);
                        } else if(item.type === 'enrollment') {
                            return this.renderEnrollmentTask(item);
                        }
                    })
                }
            </Accordion>
        );
    }

    render = () => {
        return (
            <div>
                <div className="widget well hub-widget leftAlign">
                    <div className="widget-header">My Pending Approvals</div>
                    <div id="taskAccordian">
                        {this.props.viewTasks ? this.renderTasks() : <div> </div>}
                    </div>
                    {/* { this.showDetails(1) } */}
                    <div id="taskDetails"></div>
                </div>
            </div>

        )
    }
}

export default Task;
