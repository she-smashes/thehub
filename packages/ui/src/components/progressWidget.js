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
            <div class="hub-progress">
              Progress
            </div>
            <div class="progress-widget">

            </div>
          </div>
        )
    }
}

export default ProgressWidget;
