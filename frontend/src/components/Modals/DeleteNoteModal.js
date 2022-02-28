import React, {useState} from "react";
import { Modal } from "../../context/Modal";
import DeleteNoteForm from "../Forms/DeleteNoteForm";

function DeleteNoteModal({ note, setIsHover, selectedNoteId, setSelectedNote }){
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <div id='delete' onClick={() => setShowModal(true)}>
                <i className="fas fa-trash"/>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <DeleteNoteForm
                        note={note}
                        setIsHover={setIsHover}
                        setShowModal={setShowModal}
                        selectedNoteId={selectedNoteId}
                        setSelectedNote={setSelectedNote}
                    />
                </Modal>
            )}
        </>
    );
}
export default DeleteNoteModal;
