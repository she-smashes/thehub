/**
 * @author Shalini Jha
 * @name Dashboard
 * @desc renders dashboard component
 */

import React, {Component} from 'react';
import {Card, CardHeader} from 'material-ui/Card';

import AttendanceWidget from '../containers/attendanceContainer/index'
import ProgressWidget from '../containers/progressCategoriesContainer/index';
import EventTimelineWidget from '../containers/eventTimelineContainer/index';
import ClaimYourBadgeWidget from './claimYourBadgeWidget';
import BadgeWidget from '../containers/badgesContainer/index';


class Dashboard extends Component {

    render = () => {
        const styles ={
            card: {margin: 10}
          }
        return (            
            <div>
            <main className="hub-main-grid">
              <div className="claim-badge event-timeline well">
                    {<ClaimYourBadgeWidget />}
              </div>

              <div>
                <div className="widget-container row">
                  <div className="col-md-4 col-xs-12">
                    <div className="widget well hub-progress-widget">{<ProgressWidget />}</div>
                    <div className="widget well">{<BadgeWidget />}</div>
                    <div className="widget well">{<AttendanceWidget />}</div>
                  </div>
                  <div className="col-md-8 col-xs-12">
                    <div className="event-timeline-widget well hub-home-event-timeline">{<EventTimelineWidget />}</div>
                  </div>
                </div>
              </div>
              <div className="event-timeline well hub-home-event-gallery">Gallery</div>
              </main>
              </div>
        )
    }
}

export default Dashboard;
