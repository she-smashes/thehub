import React from 'react';

import '../css/header.css'

/**
  Defined header
*/

const Header = (props) => {
  const toggleNav = (event) => {
    var nav = document.querySelector('.navbar-ex1-collapse');
    nav.classList.toggle('in');
  }
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
