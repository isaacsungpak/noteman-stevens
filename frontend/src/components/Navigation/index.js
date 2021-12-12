import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    const [specialLogo, setSpecialLogo] = useState(false);
    /////////////////////////// easter egg
    const location = useLocation();
    const path = location.pathname;
    const [count, setCount] = useState(0);

    const logoClick = () => {
      if (path === '/') {
        if (specialLogo) setCount(count - 1);
        else setCount(count + 1);
      };
    }

    useEffect(() => {
      if (count === 7) setSpecialLogo(true);
      else if (count === 0) setSpecialLogo(false);
    }, [count, specialLogo])
    ///////////////////////////


    return (
      <div id="nav-div">
        <ul id="nav-bar">
          {sessionUser && <NavLink to="/notebooks">Notebooks</NavLink>}
          <li id="logo-link-container">
            <NavLink exact to="/" id="logo-link">
              <img src={specialLogo ? '/notemanx3.png' : '/noteman-stevens-logo.png'} id="ns-logo" alt="logo" disabled={path === '/'} onClick={logoClick} />
            </NavLink>
          </li>
            {sessionUser && <ProfileButton user={sessionUser} />}
        </ul>
      </div>
    );
}

export default Navigation;
