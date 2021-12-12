import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation';
import NotebooksPage from './components/NotebooksPage';
import NotesPage from './components/NotesPage';
import NotebookNotesPage from './components/NotebookNotesPage';
import * as sessionActions from './store/session';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <div id="big-body">
        <Navigation isLoaded={isLoaded} id="nav-bar"/>
        {isLoaded && (
          <Switch>
            <Route path="/login">
              <LoginFormPage />
            </Route>
            <Route path="/signup">
              <SignupFormPage />
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
      </div>
    </>
  );
}

export default App;
