import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import styled from "styled-components";

const Tab = styled.div`
  width: 100%;
  height: 42px;
  padding: 0;
  cursor: pointer;
`
const TabContent = styled.div`
  flex: 1;
  padding: 10px;
  display: flex;
  align-items: center;
  margin: 0;
  gap: 10px;
  font-size: 18px;

  #username {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`

const Menu = styled.div`
  color: #73648a;
  background-color: #f4f2f7;
  position: absolute;
  z-index: 1000;
  width: 280px;
  height: min-content;
  left: 30px;
  border-radius: 3px;
  filter: drop-shadow(2px 2px 5px rgba(12, 9, 16, 0.5));

  ul {
    padding: 0;
    margin: 0;
  }

  li {
    padding: 10px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  li:not(#logout) {
    color: #BEB2D2;
  }

  #email {
    border-top: 1px solid #CDBFD9;
    border-bottom: 1px solid #A393BF;
  }

  #logout {
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
  }

  #logout:hover {
    color: #f4f2f7;
    background-color: #A393BF;
  }
`

function ProfileTab({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <Tab onClick={openMenu}>
      <TabContent>
        <i className={`far fa-user-circle`} />
        <div id="username">{user.username}</div>
        {showMenu ? <i className="fas fa-chevron-up"/> : <i className="fas fa-chevron-down"/>}
      </TabContent>

      {showMenu && (
        <Menu>
          <ul className="profile-dropdown" >
            <li>{user.username}</li>
            <li id='email'>{user.email}</li>
            <li id="logout" onClick={logout}>
              Log Out
            </li>
          </ul>
        </Menu>
      )}
    </Tab>
  );
}

export default ProfileTab;
