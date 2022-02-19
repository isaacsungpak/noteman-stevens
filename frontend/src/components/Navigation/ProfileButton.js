import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import styled from "styled-components";

const Tab = styled.div`
  width: 100%;
  height: 50px;
  padding: 0;
`
const TabContent = styled.div`
  flex: 1;
  padding: 10px;
  display: flex;
  margin: 0;
  gap: 10px;
  font-weight: 700;
  font-size: 18px;
`

const Menu = styled.div`
  color: #73648a;
  background-color: #f4f2f7;
  position: absolute;
  left: 30px;
  z-index: 1000;
  width: 300px;
  height: min-content;
  border-radius: 3px;
  padding: 10px;
  filter: drop-shadow(2px 2px 5px rgba(12, 9, 16, 0.5));

  ul {
    padding: 0;
    margin: 0;
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
        <div>{user.username}</div>
      </TabContent>

      {showMenu && (
        <Menu>
          <ul className="profile-dropdown" >
            <li>{user.username}</li>
            <li className="last-info">{user.email}</li>
            <li className="button-holder">
              <button onClick={logout} className="last-button button-in-dropdown">Log Out</button>
            </li>
          </ul>
        </Menu>
      )}
    </Tab>
  );
}

export default ProfileTab;
