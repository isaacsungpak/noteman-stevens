import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as noteActions from '../../store/notes';

function CreateForm({ notebookId, setShowCreateModal }) {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [validErrors, setValidErrors] = useState([]);
    const [canSubmit, setCanSubmit] = useState('');

    const newNote = (e) => {
        e.preventDefault();
        dispatch(noteActions.createNoteFromNotebook(name.trim(), '', notebookId))
            .then(() => setShowCreateModal(false));
    }

    const cancelBtn = (e) => {
        e.preventDefault();
        setShowCreateModal(false);
    };

    useEffect(() => {
        const errors = [];

        if (name.trim().length > 50) errors.push("Name length cannot exceed 50 characters.");

        setValidErrors(errors);
    }, [name]);

    useEffect(() => {
        if (validErrors.length > 0 || notebookId === '') setCanSubmit(false);
        else setCanSubmit(true);
    }, [validErrors, notebookId])

    return (
        <>
            <p className="modal-title">Create a new note</p>
            <p className="modal-message">Enter new note name and select a notebook:</p>
            <ul className="validation-errors">
                {validErrors.length > 0 && validErrors.map((err, i) => (<li key={i}>{err}</li>))}
            </ul>
            <form onSubmit={newNote}>
                <label for='title'>Title <i>(opt.)</i>: </label>
                <input onChange={(e) => setName(e.target.value)} value={name} type='text' placeholder='Untitled' name='title'/>
                <div className="submit-cancel-button-holder">
                    <button disabled={!canSubmit} id={!canSubmit ? 'disabled' : undefined}>Submit</button>
                    <button onClick={cancelBtn}>Cancel</button>
                </div>
            </form>
        </>
    )
}

export default CreateForm;
