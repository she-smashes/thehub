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
           <div className="hub-badges">
             Badges
           </div>
           <div className="badges-widget">

           </div>
          </div>
        )
    }
}

export default BadgeWidget;
