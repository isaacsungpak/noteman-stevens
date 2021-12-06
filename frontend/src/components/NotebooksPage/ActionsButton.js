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

    const deleteBtn = () => {
        return dispatch(notebookActions.deleteNotebook(user, notebook));
    }

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
            <li>%%%%% RENAME %%%%%</li>
            <button onClick={deleteBtn}>DELETE</button>
          </ul>
        )}
      </>
    );
}

export default ActionsButton;
