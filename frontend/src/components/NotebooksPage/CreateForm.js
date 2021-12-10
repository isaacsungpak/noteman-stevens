import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as notebookActions from '../../store/notebooks';

function CreateForm({ notebooks, setShowCreateModal }) {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [validErrors, setValidErrors] = useState([]);
    const [canSubmit, setCanSubmit] = useState(false);

    const newNotebook = (e) => {
        e.preventDefault();
        dispatch(notebookActions.createNotebook(name.trim()));
        setShowCreateModal(false);
    }

    const cancelBtn = (e) => {
        e.preventDefault();
        setShowCreateModal(false);
    };

    useEffect(() => {
        const errors = [];

        let nameExists;
        if (name) nameExists = notebooks.find(nb => nb.title === name.trim())

        if (name.trim().length > 50) errors.push("Name length cannot exceed 50 characters.");
        else if (nameExists) errors.push("Name is already in use.")

        setValidErrors(errors);
    }, [name, notebooks]);

    useEffect(() => {
        const submit = (validErrors.length === 0 && name.trim().length > 0);

        setCanSubmit(submit);
    }, [validErrors, name]);

    return (
        <>
            <p className="modal-title">Create a new notebook</p>
            <p className="modal-message">Enter new notebook name:</p>
            <ul className="validation-errors">
                {validErrors.length > 0 && validErrors.map((err, i) => (<li key={i}>{err}</li>))}
            </ul>
            <form onSubmit={newNotebook}>
                <input onChange={(e) => setName(e.target.value)} value={name} type='text' placeholder='Notebook name' />
                <div className="submit-cancel-button-holder">
                    <button disabled={!canSubmit} id={!canSubmit ? 'disabled' : undefined}>Submit</button>
                    <button onClick={cancelBtn}>Cancel</button>
                </div>
            </form>

        </>
    )
}

export default CreateForm;
