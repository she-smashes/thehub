/**
 * @author Shalini Jha
 * @name ProgressWidget
 * @desc renders progress widget
 */

import React, {Component} from 'react';

class ProgressWidget extends Component {

    render = () => {
        return (
          <div className="hub-progress-widget widget well">
            <div className="hub-progress">
              Progress
            </div>
            <div className="progress-widget">
            </div>
          </div>
        )
    }
}

export default ProgressWidget;
