import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileTab from './ProfileTab';
import styled from 'styled-components';
import Noteman from '../Images/NotemanSq.png';

const NavBar = styled.nav`
  width: 250px;
  height: 100%;
  background-color: #0C0910;
  color: #f4f2f7;
  position: fixed;
  left: 0;
  z-index: 1000;
  box-shadow: 0 0 8px rgba(69, 55, 80, 0.3);

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    height: calc(100vh - 282px);
    overflow-y: auto;
  }
`

const SearchBar = styled.div`
  padding-top: 5px;
  padding-bottom: 10px;
  width: 100%;
  display: flex;
  justify-content: center;

  input {
    padding: 3px 8px;
    border: 0;
    border-radius: 15px;
    outline: none;
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
    width: 85%;
  }
`

const NavTab = styled.li`
    flex: 1;
    height: 40px;
    cursor: pointer;

    a {
      text-decoration: none;
      flex: 1;
      padding: 10px;
      color: #F4F2F7;
      display: flex;
      gap: 10px;
    }

    .active {
      background-color: #453750;
    }
`

const Logo = styled.div`
  height: 200px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;

  img {
    width: 150px;
    height: 150px;
    margin-right: 10px;
  }
`

function Navigation() {
    const sessionUser = useSelector(state => state.session.user);

    return (
      <NavBar>
        <ProfileTab user={sessionUser} />
        <SearchBar>
          <input
            placeholder='Search'
          />
        </SearchBar>
        <ul id="nav-bar">
          <NavTab>
            <NavLink exact to="/">
              <i class="fas fa-home"/>
              <div>Home</div>
            </NavLink>
          </NavTab>

          <NavTab>
            <NavLink exact to="/notes">
              <i class="fas fa-sticky-note"/>
              <div>Notes</div>
            </NavLink>
          </NavTab>

          <NavTab>
            <NavLink exact to="/notebooks">
              <i class="fas fa-book-open"></i>
              <div>Notebooks</div>
            </NavLink>
          </NavTab>

          <NavTab>
            <NavLink exact to="/tags">
              <i class="fas fa-tag"/>
              <div>Tags</div>
            </NavLink>
          </NavTab>
        </ul>
        <Logo>
          <Link to="/">
            <img src={Noteman} alt="Happy Noteman"/>
          </Link>
        </Logo>
      </NavBar>
    );
}

export default Navigation;
