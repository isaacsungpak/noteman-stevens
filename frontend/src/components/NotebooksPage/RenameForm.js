import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import * as notebookActions from '../../store/notebooks';

function RenameForm({ notebook, setShowRenameModal }) {
    const dispatch = useDispatch();
    const notebooks = useSelector((state) => state.notebook.notebooks);
    const [newName, setNewName] = useState('');
    const [validErrors, setValidErrors] = useState([]);
    const [canSubmit, setCanSubmit] = useState(false);

    useEffect(() => {
        dispatch(notebookActions.getNotebooks());
    }, [dispatch]);

    const submitNewName = (e) => {
        e.preventDefault();
        dispatch(notebookActions.updateNotebook(notebook.id, newName.trim()));
        setShowRenameModal(false);
    };

    const cancelBtn = (e) => {
        e.preventDefault();
        setShowRenameModal(false);
    };

    useEffect(() => {
        const errors = [];

        let nameExists;
        if (newName) nameExists = notebooks.find(nb => nb.title === newName)

        if (newName.length > 50) errors.push("Name length cannot exceed 50 characters.");
        else if (nameExists) errors.push("Name is already in use.")

        setValidErrors(errors);
    }, [newName, notebooks]);

    useEffect(() => {
        const submit = (validErrors.length === 0 && newName.length > 0);

        setCanSubmit(submit);
    }, [validErrors, newName]);

    return (
        <>
            <p>Rename</p>
            <p>Enter new name:</p>
            <ul>
                {validErrors.length > 0 && validErrors.map((err, i) => (
                    <li key={i}>{err}</li>
                ))}
            </ul>
            <form onSubmit={submitNewName}>
                <input onChange={(e) => setNewName(e.target.value)} value={newName} type='text' placeholder='New name' />
                <button disabled={!canSubmit}>Submit</button>
                <button onClick={cancelBtn}>Cancel</button>
            </form>
        </>
    )

}

export default RenameForm;
