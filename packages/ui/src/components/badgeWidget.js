/**
 * @author Shalini Jha
 * @name BadgeWidget
 * @desc renders badge widget component
 */

import React, {Component} from 'react';

class BadgeWidget extends Component {

    /**
     * @name render
     * @desc Renders the login HTML
     */
    render = () => {
        return (
          <div className="hub-badges-widget widget well">
           <div class="hub-badges">
             Badges
           </div>
           <div class="badges-widget">

           </div>
          </div>
        )
    }
}

export default BadgeWidget;
