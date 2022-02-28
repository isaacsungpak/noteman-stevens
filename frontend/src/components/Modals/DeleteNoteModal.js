import React, {useState} from "react";
import { Modal } from "../../context/Modal";
import DeleteNoteForm from "../Forms/DeleteNoteForm";
import styled from "styled-components";

function DeleteNoteModal({ note, setIsHover }){
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <div id='delete' onClick={() => setShowModal(true)}>
                <i className="fas fa-trash"/>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <DeleteNoteForm note={note} setIsHover={setIsHover} setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}
export default DeleteNoteModal;
