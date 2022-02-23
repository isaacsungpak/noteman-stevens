import React from 'react';
import { Modal } from '../../context/Modal';
import CreateForm from './CreateForm';

function CreateModal({ setShowCreateModal }) {
    return (
        <>
            <Modal onClose={() => setShowCreateModal(false)}>
                <CreateForm setShowCreateModal={setShowCreateModal} />
            </Modal>
        </>
    );
};

export default CreateModal;
