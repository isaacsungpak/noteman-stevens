import React, {useState} from "react";
import { Modal } from "../../context/Modal";
import CreateNoteForm from "../Forms/CreateNoteForm";
import NewNoteButton from "../Buttons/Template-NewNoteButton";

function CreateNoteModal(){
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <div onClick={() => setShowModal(true)}><NewNoteButton /></div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateNoteForm setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}
export default CreateNoteModal;
