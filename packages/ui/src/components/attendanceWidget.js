import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Divider from 'material-ui/Divider';
import './accordian.css';
import Moment from 'moment';
import { Link } from 'react-router-dom';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
/**
*
 * This class the component for rendering the events in the approval page.
*
 */
class AttendanceWidget extends Component {

    constructor(props) {
        super(props);

    }

    componentDidMount = () => {
        this.props.getAttendanceInfo(this.props.userInfo.userId, this.props.userInfo.id).then((response, error) => {
            console.log(response);
            this.props.updateAttendanceInfo(JSON.parse(response.data));
        }, (error) => {
            console.log(error);
        });
    }

    showAttendance = () => {
        console.log(this.props.attendanceInfo);
        return this.props.attendanceInfo.map((event, index) => {
            return (
                <TableRow key={index}>
                    <TableRowColumn> {event.events.title} </TableRowColumn>
                    <TableRowColumn> {Moment(event.events.startDate).format('LL')} </TableRowColumn>

                </TableRow>
            );
        });
    }

    render = () => {

        return (
            <div>
                <div className="widget-header">My Attendance</div>
                <div className="inner-container">
                    <div id="ViewEvent">

                        <Table style={{ "width": '96%', "margin": "auto" }} className="event-details">
                            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                                <TableRow className="table-body">
                                    <TableHeaderColumn colSpan="2" tooltip="Participants details" style={{ textAlign: 'center' }}>
                                        Attendance Details
                                        </TableHeaderColumn>
                                </TableRow>
                                <TableRow className="table-header">
                                    <TableHeaderColumn tooltip="The user name" >Event Name</TableHeaderColumn>
                                    <TableHeaderColumn tooltip="Registered for the event on" >Date</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody displayRowCheckbox={false}>
                                {this.showAttendance()}
                            </TableBody>
                        </Table>

                    </div>
                </div>
            </div>
        );
    }
}

export default AttendanceWidget;
