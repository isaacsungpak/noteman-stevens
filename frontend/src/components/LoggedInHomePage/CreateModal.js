import React from 'react';
import { Modal } from '../../context/Modal';
import CreateForm from './CreateForm';

function CreateModal({ content, setShowCreateModal }) {
    return (
        <>
            <Modal onClose={() => setShowCreateModal(false)}>
                <CreateForm content={content} setShowCreateModal={setShowCreateModal} />
            </Modal>
        </>
    );
};

export default CreateModal;
