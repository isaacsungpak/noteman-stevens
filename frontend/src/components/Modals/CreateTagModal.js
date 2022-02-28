import React, {useState} from "react";
import { Modal } from "../../context/Modal";
import CreateTagForm from "../Forms/CreateTagForm";

function CreateTagModal() {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <div className='add' onClick={() => setShowModal(true)}>
                <i className="fas fa-plus-circle"/>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateTagForm setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export default CreateTagModal;
