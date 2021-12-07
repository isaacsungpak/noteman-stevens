import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as notebookActions from '../../store/notebooks';
import RenameModal from "./RenameModal";

function ActionsButton({ notebook }) {
    const dispatch = useDispatch();
    const [showActions, setShowActions] = useState(false);
    const [showRenameModal, setShowRenameModal] = useState(false);

    const openActions = () => {
        if (showActions) return;
        setShowActions(true);
    };

    const deleteBtn = () => {
        return dispatch(notebookActions.deleteNotebook(notebook.id));
    };

    useEffect(() => {
        if (!showActions) return;

        const closeActions = () => {
            setShowActions(false);
        };

        document.addEventListener('click', closeActions);

        return () => document.removeEventListener('click', closeActions);
    }, [showActions]);

    return (
      <>
        <button onClick={openActions}>
            {/* <i className="fa-solid fa-ellipsis" /> */}%%%%
        </button>
        {showRenameModal && <RenameModal notebook={notebook} setShowRenameModal={setShowRenameModal} />}
        {showActions && (
          <ul className="actions-dropdown">
            <li>
                <button onClick={() => setShowRenameModal(true)}>Edit</button>
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
