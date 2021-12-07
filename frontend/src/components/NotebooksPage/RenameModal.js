import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import RenameForm from './RenameForm';

function RenameModal({ user, notebook, setActionsMenuInUse }) {
  const [showRenameModal, setShowRenameModal] = useState(false);

  const renameBtnOnClick = () => {
    setShowRenameModal(true);
    setActionsMenuInUse(true);
  }

  const renameBtnOnClose = () => {
    setShowRenameModal(false);
    setActionsMenuInUse(false);
  }

  return (
    <>
      <button onClick={renameBtnOnClick}>Edit</button>
      {showRenameModal && (
        <Modal onClose={renameBtnOnClose}>
          <RenameForm user={user} notebook={notebook} setShowRenameModal={setShowRenameModal} setActionsMenuInUse={setActionsMenuInUse}/>
        </Modal>
      )}
    </>
  );
}

export default RenameModal;
