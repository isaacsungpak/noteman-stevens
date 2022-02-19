import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from 'react-router-dom';
import UserlessHomePage from './components/UserlessHomePage';
import LoggedInHomePage from './components/LoggedInHomePage';
import Navigation from './components/Navigation';
import NotebooksPage from './components/NotebooksPage';
import NotesPage from './components/NotesPage';
import NotebookNotesPage from './components/NotebookNotesPage';
import * as sessionActions from './store/session';
import styled from "styled-components";

const Page = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
`

const Content = styled.div`
  flex: 1;
  display: flex;
  position: fixed;
  left: 300px;
`

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector((state) => state.session?.user);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <Page>
      {sessionUser ?
        <>
          <Navigation isLoaded={isLoaded}/>
          <Content>
            {isLoaded && (
              <Switch>
                <Route exact path='/'>
                  <LoggedInHomePage sessionUser={sessionUser} />
                </Route>
                <Route exact path="/notebooks">
                  <NotebooksPage />
                </Route>
                <Route path="/notebooks/:notebookId">
                  <NotebookNotesPage />
                </Route>
                <Route path="/notes">
                  <NotesPage />
                </Route>
              </Switch>
            )}
          </Content>
        </>
        :
        <UserlessHomePage />
      }
    </Page>

  );
}

export default App;
