import React from 'react';
import { Modal } from '../../context/Modal';
import CreateForm from './CreateForm';

function CreateModal({ notebooks, setShowCreateModal }) {
    return (
        <>
            <Modal onClose={() => setShowCreateModal(false)}>
                <CreateForm notebooks={notebooks} setShowCreateModal={setShowCreateModal} />
            </Modal>
        </>
    );
};

export default CreateModal;
