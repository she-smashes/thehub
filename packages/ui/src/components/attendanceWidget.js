/**
 * @author Shalini Jha
 * @name AttendanceWidget
 * @desc renders dashboard component
 */

import React, {Component} from 'react';

class AttendanceWidget extends Component {

    render = () => {
        return (
          <div class="hub-attendance-widget widget well">
            <div class="hub-attendance">
              Attendance
            </div>
            <div class="attendance-widget">

            </div>
          </div>  
        )
    }
}

export default AttendanceWidget;
