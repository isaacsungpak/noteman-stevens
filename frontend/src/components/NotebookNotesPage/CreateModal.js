import React from 'react';
import { Modal } from '../../context/Modal';
import CreateForm from './CreateForm';

function CreateModal({ notebookId, setShowCreateModal }) {
    return (
        <>
            <Modal onClose={() => setShowCreateModal(false)}>
                <CreateForm notebookId={notebookId} setShowCreateModal={setShowCreateModal} />
            </Modal>
        </>
    );
};

export default CreateModal;
