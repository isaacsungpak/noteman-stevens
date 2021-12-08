import React, { useState, useEffect } from "react";
import RenameModal from "./RenameModal";
import DeleteModal from "./DeleteModal";

function ActionsButton({ notebook }) {
    const [showActions, setShowActions] = useState(false);
    const [showRenameModal, setShowRenameModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const openActions = () => {
        if (showActions) return;
        setShowActions(true);
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
        {showDeleteModal && <DeleteModal notebook={notebook} setShowDeleteModal={setShowDeleteModal} />}
        {showActions && (
          <div className={`dropdown-box`}>
            <ul className="actions-dropdown">
              <li className="action-button-container">
                  <button onClick={() => setShowRenameModal(true)}>Edit</button>
              </li>
              <li className="action-button-container">
                <button onClick={() => setShowDeleteModal(true)}>Delete</button>
              </li>
            </ul>
          </div>
        )}
      </>
    );
}

export default ActionsButton;
