import React, {useState} from "react";
// import styled from "styled-components";
import { Modal } from "../../context/Modal";
import CreateNotebookForm from "../Forms/CreateNotebookForm";

function CreateNotebookModal(){
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <div className='add' onClick={() => setShowModal(true)}>
                <i className="fas fa-plus-circle"/>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateNotebookForm setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}
export default CreateNotebookModal;
