import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import RenameForm from './RenameForm';

function RenameModal({ user, notebook }) {
  const [showRenameModal, setShowRenameModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowRenameModal(true)}>Edit</button>
      {showRenameModal && (
        <Modal onClose={() => setShowRenameModal(false)}>
          <RenameForm user={user} notebook={notebook} setShowRenameModal={setShowRenameModal}/>
        </Modal>
      )}
    </>
  );
}

export default RenameModal;
