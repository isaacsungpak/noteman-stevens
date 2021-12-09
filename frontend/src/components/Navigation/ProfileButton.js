import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
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
    <div id="prof-dropdown-button-and-menu">
      <button onClick={openMenu} className={showMenu ? 'menu-active': undefined}>
        <i className={`far fa-user-circle`} />
      </button>
      {showMenu && (
        <div className="dropdown-box">
          <ul className="profile-dropdown" >
            <li>{user.username}</li>
            <li className="last-info">{user.email}</li>
            <li className="button-holder">
              <button onClick={logout} className="last-button button-in-dropdown">Log Out</button>
            </li>
          </ul>
        </div>

      )}
    </div>
  );
}

export default ProfileButton;
