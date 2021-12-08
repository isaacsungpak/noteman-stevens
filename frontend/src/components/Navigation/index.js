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
        <>
          <NavLink to="/login">Log In</NavLink>
          <NavLink to="/signup">Sign Up</NavLink>
        </>
    );

    return (
      <div id="nav-div">
        <ul id="nav-bar">
          <li id="logo-link-container">
            <div>[navigation]</div>
            <NavLink exact to="/" id="logo-link">
              <img src='/noteman-stevens-logo.png' id="ns-logo"></img>
            </NavLink>
            {isLoaded && sessionLinks}
          </li>
        </ul>
      </div>
    );
}

export default Navigation;
