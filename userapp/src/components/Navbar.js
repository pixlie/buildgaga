import React from 'react';
import { Link } from 'react-router-dom';


export default () => (
  <nav className="navbar is-light" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <a className="navbar-item is-mega" href="/">
        Build Gaga
      </a>

      <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" href="/">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" className="navbar-menu">
      <div className="navbar-start">
        <Link className="navbar-item" to="/">
          Home
        </Link>

        <Link className="navbar-item" to="/fav">
          Fav
        </Link>
      </div>
    </div>
  </nav>
)