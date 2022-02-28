import React, {useState} from "react";
import { Modal } from "../../context/Modal";
import DeleteNotebookForm from "../Forms/DeleteNotebookForm";

function DeleteNotebookModal({ notebook }){
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <div className='option' onClick={() => setShowModal(true)}>
                <i className="fas fa-trash"/>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <DeleteNotebookForm notebook={notebook} setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}
export default DeleteNotebookModal;
