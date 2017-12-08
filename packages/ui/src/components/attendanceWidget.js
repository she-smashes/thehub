/**
 * @author Shalini Jha
 * @name AttendanceWidget
 * @desc renders dashboard component
 */

import React, {Component} from 'react';

class AttendanceWidget extends Component {

    render = () => {
        return (
          <div className="hub-attendance-widget widget well">
            <div className="hub-attendance">
              Attendance
            </div>
            <div className="attendance-widget">

            </div>
          </div>
        )
    }
}

export default AttendanceWidget;
