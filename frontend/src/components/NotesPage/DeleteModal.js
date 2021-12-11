import React from 'react';
import { Modal } from '../../context/Modal';
import DeleteForm from './DeleteForm';

function DeleteModal({ note, setShowDeleteModal }) {
  return (
    <>
        <Modal onClose={() => setShowDeleteModal(false)}>
          <DeleteForm note={note} setShowDeleteModal={setShowDeleteModal} />
        </Modal>
    </>
  );
}

export default DeleteModal;
