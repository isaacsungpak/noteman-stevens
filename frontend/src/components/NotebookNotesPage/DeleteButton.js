import React, { useState } from "react";
import DeleteModal from "./DeleteModal";

function DeleteButton({ note }) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    return (
      <>
        <button onClick={() => setShowDeleteModal(true)}>
          <i className="fas fa-ellipsis-h"></i>
        </button>
        {showDeleteModal && <DeleteModal note={note} setShowDeleteModal={setShowDeleteModal} />}
      </>
    );
}

export default DeleteButton;
