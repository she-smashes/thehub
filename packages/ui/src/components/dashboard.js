/**
 * @author Shalini Jha
 * @name Dashboard
 * @desc renders dashboard component
 */

import React, { Component } from 'react';
import { Card, CardHeader } from 'material-ui/Card';

import AttendanceWidget from '../containers/attendanceContainer/index'
import ProgressWidget from '../containers/progressCategoriesContainer/index';
import EventTimelineWidget from '../containers/eventTimelineContainer/index';
import ClaimYourBadgeWidget from '../containers/claimYourBadgeContainer/index';
import BadgeWidget from '../containers/badgesContainer/index';


class Dashboard extends Component {

  render = () => {
    const styles = {
      card: { margin: 10 }
    }
    return (
      <div className="body-container">
        <main className="hub-main-grid">
        <div style={{"margin-bottom": "20px"}}></div>
   {/*        {<ClaimYourBadgeWidget />} */}
          <div>
            <div className="widget-container row">
              <div class="col-md-12 col-xs-12 noPad">
                <div className="col-md-4 col-xs-12">
                  <div className="widget well hub-progress-widget">{<ProgressWidget />}</div>
                </div>
                <div className="col-md-8 col-xs-12">
                  <div className="event-timeline-widget well hub-home-event-timeline">{<EventTimelineWidget />}</div>
                </div>
                <div className="col-md-4 col-xs-12">
                  <div className="widget well badge-widget">{<BadgeWidget />}</div>
                  <div className="widget well hub-progress-widget">{<AttendanceWidget />}</div>
                </div>
              </div>


            </div>
          </div>
        </main>
      </div>
    )
  }
}

export default Dashboard;
