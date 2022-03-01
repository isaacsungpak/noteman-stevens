import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { createNote } from "../../store/notes";
import ModalFormContainer from "./ModalFormContainer";

function CreateNoteForm({ setShowModal }) {
    const dispatch = useDispatch();
    const [selectedNotebookId, setSelectedNotebookId] = useState(0);

    const notebooks = useSelector(state => state.notebooks.notebooks);

    const submitNote = (e) => {
        e.preventDefault();
        dispatch(createNote("", "", selectedNotebookId))
            .then(() => setShowModal(false));
    }

    const cancelBtn = (e) => {
        e.preventDefault();
        setShowModal(false);
    }

    const organizedNotebooks = Object.values(notebooks).sort((a, b) => a.title.localeCompare(b.title));

    return (
        <ModalFormContainer>
            <div id="title">Create a Note</div>
            {/* <div id="instructions">Select a notebook</div> */}
            <form onSubmit={createNote}>
                <select
                    value={selectedNotebookId}
                    onChange={e => setSelectedNotebookId(e.target.value)}
                >
                    <option
                        value={0}
                        disabled
                    >
                        Select a notebook
                    </option>
                    {
                        organizedNotebooks.map(notebook => (
                            <option value={notebook.id} key={`notebook${notebook.id}`}>
                                {notebook.title}
                            </option>
                        ))
                    }
                </select>
                <div id="button-holder">
                    <button disabled={selectedNotebookId === 0} onClick={submitNote}>Create</button>
                    <button onClick={cancelBtn}>Cancel</button>
                </div>
            </form>
        </ModalFormContainer>
    )
}

export default CreateNoteForm;
