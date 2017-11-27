import React from 'react';

import '../css/header.css'

/**
  Defined header
*/

const Header = (props) => {
  return (
    <nav className="header navbar navbar-fixed">
      {/* <!-- Brand and toggle get grouped for better mobile display --> */}
      <div className="navbar-header">
        <h1 className="brand-title">The Hub</h1>
      </div>
    </nav>
  );
}

export default Header;
