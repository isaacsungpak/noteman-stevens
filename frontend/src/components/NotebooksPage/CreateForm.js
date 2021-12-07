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
        if (name) nameExists = notebooks.find(nb => nb.title === name)

        if (name.length > 50) errors.push("Name length cannot exceed 50 characters.");
        else if (nameExists) errors.push("Name is already in use.")

        setValidErrors(errors);
    }, [name, notebooks]);

    useEffect(() => {
        const submit = (validErrors.length === 0 && name.length > 0);

        setCanSubmit(submit);
    }, [validErrors, name]);

    return (
        <>
            <p>Create a new notebook</p>
            <p>Enter new notebook name:</p>
            <ul>
                {validErrors.length > 0 && validErrors.map((err, i) => (<li key={i}>{err}</li>))}
            </ul>
            <form onSubmit={newNotebook}>
                <input onChange={(e) => setName(e.target.value)} value={name} type='text' placeholder='Notebook name' />
                <button disabled={!canSubmit}>Submit</button>
                <button onClick={cancelBtn}>Cancel</button>
            </form>

        </>
    )
}

export default CreateForm;
