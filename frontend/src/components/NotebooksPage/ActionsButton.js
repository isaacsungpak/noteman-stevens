import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as notebookActions from '../../store/notebooks';

function ActionsButton({ user, notebook }) {
    const dispatch = useDispatch();
    const [showActions, setShowActions] = useState(false);

    const openActions = () => {
        if (showActions) return;
        setShowActions(true);
    };

    const renameBtn = () => {
      return dispatch(notebookActions.updateNotebook(user, notebook.id, (Math.random().toFixed(4) * 10000).toString()));
    };

    const deleteBtn = () => {
        return dispatch(notebookActions.deleteNotebook(user, notebook.id));
    };

    useEffect(() => {
        if (!showActions) return;

        const closeActions = () => {
            setShowActions(false);
        };

        document.addEventListener('click', closeActions);

        return () => document.removeEventListener("click", closeActions);
    }, [showActions]);

    return (
      <>
        <button onClick={openActions}>
            {/* <i className="fa-solid fa-ellipsis" /> */}%%%%
        </button>
        {showActions && (
          <ul className="actions-dropdown">
            <li>
              <button onClick={renameBtn}>RENAME</button>
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
