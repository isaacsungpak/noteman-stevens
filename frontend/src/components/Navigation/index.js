import React from 'react';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();

    const [specialLogo, setSpecialLogo] = useState(false);
    /////////////////////////// easter egg
    const location = useLocation();
    const path = location.pathname;
    const [count, setCount] = useState(0);
    const [navSelect, setNavSelect] = useState('');

    const logoClick = () => {
      if (path === '/') {
        if (specialLogo) setCount(count - 1);
        else setCount(count + 1);
      } else setNavSelect('home');
    }

    useEffect(() => {
      if (count === 7) setSpecialLogo(true);
      else if (count === 0) setSpecialLogo(false);
    }, [count, specialLogo])
    ///////////////////////////

    useEffect(() => {
      if (navSelect === 'home') history.push('/');
      if (navSelect === 'notebooks') history.push('/notebooks');
      else if (navSelect === 'notes') history.push('/notes');
      // setNavSelect('');
    }, [navSelect])

    return (
      <div id="nav-div">
        <ul id="nav-bar">
          {sessionUser &&
            <select onChange={(e) => setNavSelect(e.target.value)} value={navSelect} id='nav-select'>
              <option value='' disabled>Navigation</option>
              <option value='home'>Home</option>
              <option value='notebooks'>Notebooks</option>
              <option value='notes'>Notes</option>
            </select>}
          <li id="logo-link-container" disabled={path === '/'}>
            <NavLink exact to="/" id="logo-link">
              <img src={specialLogo ? '/notemanx3.png' : '/noteman-stevens-logo.png'} id="ns-logo" alt="logo" onClick={logoClick} />
            </NavLink>
          </li>
            {sessionUser && <ProfileButton user={sessionUser} />}
        </ul>
      </div>
    );
}

export default Navigation;
