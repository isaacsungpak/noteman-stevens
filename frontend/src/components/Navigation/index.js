import React from 'react';
import { Link, NavLink, useLocation, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ProfileTab from './ProfileButton';
import styled from 'styled-components';
import Noteman from '../Images/NotemanSq.png';

const NavBar = styled.nav`
  width: 300px;
  height: 100%;
  background-color: #0C0910;
  color: #f4f2f7;
  position: fixed;
  left: 0;
  z-index: 1000;

  ul {
    list-style: none;
    padding: 0;
  }
`

const Logo = styled.div`
  height: 200px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 150px;
    height: 150px;
  }
`

function Navigation() {
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();
    const location = useLocation();
    const path = location.pathname;

    return (
      <NavBar>
        <ProfileTab user={sessionUser} />
        <ul id="nav-bar">
        </ul>
        <Logo>
          <Link to="/">
            <img src={Noteman}/>
          </Link>
        </Logo>
      </NavBar>
    );
}

export default Navigation;
