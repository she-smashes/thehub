import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Divider from 'material-ui/Divider';
import './accordian.css';
import Moment from 'moment';
import { Link } from 'react-router-dom';
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

    render = () => {

        return (
            <div>
                <div className="widget-header">My Attendance</div>
                <div className="inner-container">
                    <div id="ViewEvent">
                    {(this.props.attendanceInfo != undefined && this.props.attendanceInfo.length>0)?console.log(this.props.attendanceInfo):<div></div>}

                    </div>
                    <div id="eventDetails"></div>
                </div>

            </div>

        )
    }
}

export default AttendanceWidget;
