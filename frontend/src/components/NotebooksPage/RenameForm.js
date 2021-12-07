import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import * as notebookActions from '../../store/notebooks';

function RenameForm({ notebook, setShowRenameModal }) {
    const dispatch = useDispatch();
    const [newName, setNewName] = useState('');
    const [validErrors, setValidErrors] = useState([]);
    const notebooks = useSelector((state) => state.notebook.notebooks);

    useEffect(() => {
        dispatch(notebookActions.getNotebooks());
    }, [dispatch])

    const submitNewName = (e) => {
        e.preventDefault();
        if (!newName) setShowRenameModal(false);
        else {
            dispatch(notebookActions.updateNotebook(notebook.id, newName.trim()));
            setShowRenameModal(false);
        };
    }

    useEffect(() => {
        const errors = [];

        let nameExists;
        if (newName) nameExists = notebooks.find(nb => nb.title === newName)

        if (newName.length > 50) errors.push("Name length cannot exceed 50 characters.");
        else if (nameExists) errors.push("Name is already in use.")

        setValidErrors(errors);
    }, [newName, notebooks])

    return (
        <>
            <p>Rename</p>
            <ul>
                {validErrors.length > 0 && validErrors.map((err, i) => (
                    <li key={i}>{err}</li>
                ))}
            </ul>
            <form onSubmit={submitNewName}>
                <input onChange={(e) => setNewName(e.target.value)} value={newName} type='text' placeholder='New name' />
                <button disabled={validErrors.length > 0}>Submit</button>
            </form>
        </>
    )

}

export default RenameForm;
