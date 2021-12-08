import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) sessionLinks = (<ProfileButton user={sessionUser} />);
    else sessionLinks = (
        <div>
          <NavLink to="/login">Log In</NavLink>
          <NavLink to="/signup">Sign Up</NavLink>
        </div>
    );

    return (
      <div id="nav-div">
        <ul id="nav-bar">
          {sessionUser && <NavLink to="/notebooks">Notebooks</NavLink>}
          <li id="logo-link-container">
            <NavLink exact to="/" id="logo-link">
              <img src='/noteman-stevens-logo.png' id="ns-logo" alt="logo" />
            </NavLink>
          </li>
            {isLoaded && sessionLinks}
        </ul>
      </div>
    );
}

export default Navigation;
