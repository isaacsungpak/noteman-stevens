import React, { useState } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
  }

  & > ul {
    height: calc(100vh - 282px);
    overflow-y: auto;
  }
`

const SearchBar = styled.form`
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
    display: flex;
    align-items: center;
    justify-content: space-between;

    a, & > div:not(.add) {
      text-decoration: none;
      flex: 1;
      padding: 10px;
      color: #F4F2F7;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 10px;
    }

    div.add {
      padding: 10px;
    }

    a.active, a.active + div.add {
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
  const history = useHistory();
  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user);
  const [searchKey, setSearchKey] = useState("");
  // const notebooks = useSelector(state => state.notebooks);
  const [showNotebooks, setShowNotebooks] = useState(false);

  const [showAddNotes, setShowAddNotes] = useState(false);
  const [showAddNotebooks, setShowAddNotebooks] = useState(false);
  const [showAddTags, setShowAddTags] = useState(false);

  // dispatch(get notebooks -> setIsLoaded)

  function submitSearch(e) {
    e.preventDefault();
    history.push(`/notes?search=${searchKey}`);
  }

  return (
    <NavBar>
      <ProfileTab user={sessionUser} />
      <SearchBar onSubmit={submitSearch}>
          <input
            placeholder='Search Notes'
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
          />
      </SearchBar>
      <ul id="nav-bar">
        <NavTab>
          <NavLink exact to="/">
            <i class="fas fa-home"/>
            <div>Home</div>
          </NavLink>
        </NavTab>

        <NavTab
          onMouseEnter={() => setShowAddNotes(true)}
          onMouseLeave={() => setShowAddNotes(false)}
        >
          <NavLink exact to="/notes">
            <i class="fas fa-sticky-note"/>
            <div>Notes</div>
          </NavLink>
          {showAddNotes && <div className='add' onClick={() => console.log("add note")}><i class="fas fa-plus-circle"></i></div>}
        </NavTab>

        <NavTab
          onMouseEnter={() => setShowAddNotebooks(true)}
          onMouseLeave={() => setShowAddNotebooks(false)}
        >
          <div onClick={() => setShowNotebooks(!showNotebooks)}>
            <i class="fas fa-book-open"/>
            <div>Notebooks</div>
            {showNotebooks ? <i className="fas fa-chevron-up"/> : <i className="fas fa-chevron-down"/>}
          </div>
          {showAddNotebooks && <div className='add' onClick={() => console.log("add notebook")}><i class="fas fa-plus-circle"></i></div>}
        </NavTab>
        {showNotebooks && <div><p>[notebooks]</p></div>}

        <NavTab
          onMouseEnter={() => setShowAddTags(true)}
          onMouseLeave={() => setShowAddTags(false)}
        >
          <NavLink exact to="/tags">
            <i class="fas fa-tag"/>
            <div>Tags</div>
          </NavLink>
          {showAddTags && <div className='add' onClick={() => console.log("add tag")}><i class="fas fa-plus-circle"></i></div>}
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
