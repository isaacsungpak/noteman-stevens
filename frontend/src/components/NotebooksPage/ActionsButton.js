import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as notebookActions from '../../store/notebooks';
import RenameModal from "./RenameModal";

function ActionsButton({ user, notebook }) {
    const dispatch = useDispatch();
    const [showActions, setShowActions] = useState(false);
    const [actionsMenuInUse, setActionsMenuInUse] = useState(false);

    const openActions = () => {
        if (showActions) return;
        setShowActions(true);
    };

    const deleteBtn = () => {
        return dispatch(notebookActions.deleteNotebook(user, notebook.id));
    };

    useEffect(() => {
        if (!showActions) return;

        const closeActions = () => {
            if (!actionsMenuInUse) setShowActions(false);
        };

        document.addEventListener('click', closeActions);

        return () => document.removeEventListener('click', closeActions);
    }, [showActions, actionsMenuInUse]);

    return (
      <>
        <button onClick={() => setShowActions(!showActions)}>
            {/* <i className="fa-solid fa-ellipsis" /> */}%%%%
        </button>
        {showActions && (
          <ul className="actions-dropdown">
            <li>
              <RenameModal user={user} notebook={notebook} setActionsMenuInUse={setActionsMenuInUse} />
            </li>
            <li>
              <button onClick={deleteBtn}>DELETE</button>
            </li>
          </ul>
        )}
      </>
    );
}

export default ActionsButton;
