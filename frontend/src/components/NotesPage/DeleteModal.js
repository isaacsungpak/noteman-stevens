import React from 'react';
import { Modal } from '../../context/Modal';
import DeleteForm from './DeleteForm';

function DeleteModal({ note, setShowDeleteModal, deletePackage }) {
  return (
    <>
        <Modal onClose={() => setShowDeleteModal(false)}>
          <DeleteForm note={note} setShowDeleteModal={setShowDeleteModal} deletePackage={deletePackage}/>
        </Modal>
    </>
  );
}

export default DeleteModal;
