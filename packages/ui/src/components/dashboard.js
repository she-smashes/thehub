/**
 * @author Shalini Jha
 * @name Dashboard
 * @desc renders dashboard component
 */

import React, {Component} from 'react';
import {Card, CardHeader} from 'material-ui/Card';

import AttendanceWidget from './attendanceWidget';
import ProgressWidget from './progressWidget';
import EventTimelineWidget from '../containers/eventTimelineContainer/index';
import ClaimYourBadgeWidget from './claimYourBadgeWidget';
import BadgeWidget from './badgeWidget';


class Dashboard extends Component {

    render = () => {
        const styles ={
            card: {margin: 10}
          }
        return (
            <div>
            <main className="hub-main-grid">
              <div className="claim-badge well">
                    {<ClaimYourBadgeWidget />}
              </div>

              <div>
                <div className="widget-container row">
                  <div className="col-md-4 col-sm-4 col-xs-12">
                    <ProgressWidget />
                    <BadgeWidget />
                    <AttendanceWidget />
                  </div>
                  <div className="col-md-8 col-sm-8 col-xs-12">
                    <EventTimelineWidget />
                  </div>
                </div>
              </div>
              <div className="hub-gallery well hub-home-event-gallery">Gallery</div>
              </main>
              </div>
        )
    }
}

export default Dashboard;
