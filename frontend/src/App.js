import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import LoggedInHomePage from './components/LoggedInHomePage';
import Navigation from './components/Navigation';

import NotesPage from './components/NotesPage';
import NotebookPage from './components/NotebookPage';
import * as sessionActions from './store/session';
import styled from "styled-components";
import { getTags } from './store/tags';
import TagsPage from './components/TagPage';
import HomePage from './components/HomePage';

const Page = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`

const Content = styled.div`
  height: 100vh;
  width: calc(100vw - 250px);
  display: flex;
  position: fixed;
  left: 250px;
`

const LinkContainer = styled.div`
  width: fit-content;
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 2000;

  a {
    font-size: 40px;
    color: #d5cbe2;
    opacity: 50%;
    margin-right: 10px;
    transition: all 0.2s ease-in-out;

    :hover {
      opacity: 100%;
    }
  }

  #gh:hover {
    color: #bd2c00;
  }
  #li:hover {
    color: #0072b1
  }
`

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [tagsLoaded, setTagsLoaded] = useState(false);
  const sessionUser = useSelector((state) => state.session?.user);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));

  }, [dispatch]);

  useEffect(() => {
    if (sessionUser) dispatch(getTags()).then(() => setTagsLoaded(true));
  }, [dispatch, sessionUser])

  return (
    <Page>
      {sessionUser ?
        tagsLoaded &&
        <>
          <Navigation isLoaded={isLoaded}/>
          <Content>
            {isLoaded && (
              <Switch>
                <Route exact path='/'>
                  <HomePage />
                </Route>
                <Route path="/notebooks/:notebookId">
                  <NotebookPage />
                </Route>
                <Route path="/notes">
                  <NotesPage />
                </Route>
                <Route path="/tags">
                  <TagsPage />
                </Route>
                <Route>
                  <LoggedInHomePage />
                </Route>
              </Switch>
            )}
          </Content>
        </>
        :
        <>
          <AuthPage />
          <LinkContainer isLoggedIn={!!sessionUser}>
            <a id="gh" href='https://github.com/isaacsungpak/noteman-stevens' target="_blank"><i className="fab fa-github-square"></i></a>
            <a id="li" href='https://www.linkedin.com/in/isaac-pak-b4324421b/' target="_blank"><i className="fab fa-linkedin"></i></a>
          </LinkContainer>
        </>
      }
    </Page>

  );
}

export default App;
