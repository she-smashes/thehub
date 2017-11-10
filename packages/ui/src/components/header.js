import React from 'react';

import '../css/header.css'

const Header = (props) => {
  return (
    <nav className="navbar navbar-fixed-top ">
      
      {/* <!-- Brand and toggle get grouped for better mobile display --> */}
      <div className="navbar-header">
        <h1 className="brand-title">Some Portal</h1>
      </div>
    </nav>
  );
}

export default Header;