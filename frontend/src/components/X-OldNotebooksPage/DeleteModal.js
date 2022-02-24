import React from 'react';
import { Modal } from '../../context/Modal';
import DeleteForm from './DeleteForm';

function DeleteModal({ notebook, setShowDeleteModal }) {
  return (
    <>
        <Modal onClose={() => setShowDeleteModal(false)}>
          <DeleteForm notebook={notebook} setShowDeleteModal={setShowDeleteModal} />
        </Modal>
    </>
  );
}

export default DeleteModal;
