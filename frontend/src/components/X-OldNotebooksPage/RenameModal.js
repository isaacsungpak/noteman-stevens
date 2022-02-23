import React from 'react';
import { Modal } from '../../context/Modal';
import RenameForm from './RenameForm';

function RenameModal({ notebook, setShowRenameModal }) {
  return (
    <>
        <Modal onClose={() => setShowRenameModal(false)}>
          <RenameForm notebook={notebook} setShowRenameModal={setShowRenameModal} />
        </Modal>
    </>
  );
}

export default RenameModal;
