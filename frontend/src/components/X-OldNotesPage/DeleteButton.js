import React, { useState } from "react";
import DeleteModal from "./DeleteModal";

function DeleteButton({ note, deletePackage }) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    return (
      <>
        <button onClick={() => setShowDeleteModal(true)}>
          <i className="far fa-trash-alt"></i>
        </button>
        {showDeleteModal && <DeleteModal note={note} setShowDeleteModal={setShowDeleteModal} deletePackage={deletePackage}/>}
      </>
    );
}

export default DeleteButton;
