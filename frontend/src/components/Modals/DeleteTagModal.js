import React, {useState} from "react";
import { Modal } from "../../context/Modal";
import DeleteTagForm from "../Forms/DeleteTagForm";

function DeleteTagModal({ tag, selectedTagId, setSelectedTagId }){
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <div id='delete' onClick={() => setShowModal(true)}>
                <i className="fas fa-trash"/>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <DeleteTagForm
                        tag={tag}
                        selectedTagId={selectedTagId}
                        setSelectedTagId={setSelectedTagId}
                        setShowModal={setShowModal}
                    />
                </Modal>
            )}
        </>
    );
}
export default DeleteTagModal;
