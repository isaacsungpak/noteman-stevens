import React, { useEffect, useState } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileTab from './ProfileTab';
import styled from 'styled-components';
import Noteman from '../Images/NotemanSq.png';
import { getNotebooks } from '../../store/notebooks';
import CreateNotebookModal from '../Modals/CreateNotebookModal';

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
      color: #DFD9E8;
    }

    a.active, a.active + div.add {
      background-color: #453750;
    }

    div.add > i:hover {
      color: #FFF;
    }
`

const NotebooksMenu = styled.div`
    width: 100%;
    height: min-content;

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    li {
      display: flex;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    a {
      text-decoration: none;
      flex: 1;
      padding: 5px 0;
      padding-left: 30px;
      color: #F4F2F7;

      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
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
  const history = useHistory();
  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user);
  const [searchKey, setSearchKey] = useState("");
  const notebooks = useSelector(state => state.notebooks.notebooks);

  const [notebooksLoaded, setNotebooksLoaded] = useState(false);
  const [showNotebooks, setShowNotebooks] = useState(false);

  const [showAddNotes, setShowAddNotes] = useState(false);
  const [showAddNotebooks, setShowAddNotebooks] = useState(false);
  const [showAddTags, setShowAddTags] = useState(false);

  function submitSearch(e) {
    e.preventDefault();
    if(searchKey !== '') history.push(`/notes?search=${searchKey}`);
  };

  useEffect(() => {
    dispatch(getNotebooks())
      .then(() => setNotebooksLoaded(true));
  }, [dispatch]);

  const orderedNotebooks = Object.values(notebooks).sort((a,b) => (new Date(b.updatedAt) - new Date(a.updatedAt)));

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
            <i className="fas fa-home"/>
            <div>Home</div>
          </NavLink>
        </NavTab>

        <NavTab
          onMouseEnter={() => setShowAddNotes(true)}
          onMouseLeave={() => setShowAddNotes(false)}
        >
          <NavLink exact to="/notes">
            <i className="fas fa-sticky-note"/>
            <div>Notes</div>
          </NavLink>
          {showAddNotes && <div className='add' onClick={() => console.log("add note")}><i className="fas fa-plus-circle"/></div>}
        </NavTab>

        <NavTab
          onMouseEnter={() => setShowAddNotebooks(true)}
          onMouseLeave={() => setShowAddNotebooks(false)}
        >
          <div onClick={() => setShowNotebooks(!showNotebooks)}>
            <i className="fas fa-book-open"/>
            <div>Notebooks</div>
            {showNotebooks ? <i className="fas fa-chevron-up"/> : <i className="fas fa-chevron-down"/>}
          </div>
          {showAddNotebooks && <CreateNotebookModal setShowNotebooks={setShowNotebooks}/>}
        </NavTab>
        {(showNotebooks && notebooksLoaded) &&
          <NotebooksMenu>
            <ul>
              {orderedNotebooks.map((notebook, idx) => (
                <li><NavLink to={`/notebooks/${notebook.id}`} key={`nb${idx}`}>{notebook.title}</NavLink></li>
              ))}
            </ul>
          </NotebooksMenu>
        }

        <NavTab
          onMouseEnter={() => setShowAddTags(true)}
          onMouseLeave={() => setShowAddTags(false)}
        >
          <NavLink exact to="/tags">
            <i className="fas fa-tag"/>
            <div>Tags</div>
          </NavLink>
          {showAddTags && <div className='add' onClick={() => console.log("add tag")}><i className="fas fa-plus-circle"></i></div>}
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
