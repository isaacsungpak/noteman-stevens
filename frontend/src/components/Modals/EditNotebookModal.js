import React, {useState} from "react";
import { Modal } from "../../context/Modal";
import EditNotebookForm from "../Forms/EditNotebookForm";

function EditNotebookModal({ notebook }){
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <div className='option' onClick={() => setShowModal(true)}>
                <i className="fas fa-pen"/>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditNotebookForm notebook={notebook} setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}
export default EditNotebookModal;
