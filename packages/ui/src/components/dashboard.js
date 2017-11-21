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
import ViewInitiative from '../containers/viewInitiativeContainer/index';
import CreateinitiativeWidget from '../containers/createInitiativeContainer/index';
import CreateEventWidget from '../containers/createEventContainer/index';

class Dashboard extends Component {

    render = () => {
        const styles ={
            card: {margin: 10}
          }
        return (
            <div>
                <Card style={styles.card}>
                    <CardHeader
                    title={<ClaimYourBadgeWidget />}
                    actAsExpander={true}
                    showExpandableButton={true}
                    />
                </Card>
                <Card style={styles.card}>
                    <CardHeader
                    title={<EventTimelineWidget />}
                    />
                </Card>
                <Card style={styles.card}>
                    <CardHeader
                    title={<ViewInitiative />}
                    />
                </Card>
                <Card style={styles.card}>
                    <CardHeader
                    title={<ProgressWidget />}
                    actAsExpander={true}
                    showExpandableButton={true}
                    />
                </Card>
                <Card style={styles.card}>
                    <CardHeader
                    title={<BadgeWidget />}
                    actAsExpander={true}
                    showExpandableButton={true}
                    />
                </Card>
                <Card style={styles.card}>
                    <CardHeader
                    title={<AttendanceWidget />}
                    actAsExpander={true}
                    showExpandableButton={true}
                    />
                </Card>
                <Card style={styles.card}>
                    <CardHeader
                    title={<CreateEventWidget />}
                    />
                </Card>
                <Card style={styles.card}>
                    <CardHeader
                    title={<CreateinitiativeWidget />}
                    />
                </Card>
            </div>
        )
    }
}

export default Dashboard;
