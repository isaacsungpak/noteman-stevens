import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import * as noteActions from '../../store/notes';
import * as notebookActions from '../../store/notebooks';

function CreateForm({ setShowCreateModal }) {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [validErrors, setValidErrors] = useState([]);
    const [notebookId, setNotebookId] = useState('');
    const [canSubmit, setCanSubmit] = useState('');
    const notebooks = useSelector(state => state.notebook.notebooks);


    const newNote = (e) => {
        e.preventDefault();
        dispatch(noteActions.createNote(name.trim(), '', notebookId));
        setShowCreateModal(false);
    }

    const cancelBtn = (e) => {
        e.preventDefault();
        setShowCreateModal(false);
    };

    useEffect(() => {
        dispatch(notebookActions.getNotebooks());
    }, [dispatch]);

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
                <label htmlFor='title'>Title <i>(opt.)</i>: </label>
                <input onChange={(e) => setName(e.target.value)} value={name} type='text' placeholder='Untitled' name='title' />
                <br/>
                <label htmlFor='notebook-choice '>Notebook <i>(req.)</i>:</label>
                <select onChange={(e) => setNotebookId(e.target.value)} value={notebookId} defaultValue='' className='select-notebook' name='notebook-choice'>
                    <option value='' disabled>Select a notebook</option>
                    {notebooks.length > 0 && notebooks.map((nb, i) => (
                        <option key={i} value={nb.id}>{nb.title}</option>
                    ))}
                </select>
                <div className="submit-cancel-button-holder">
                    <button disabled={!canSubmit}>Submit</button>
                    <button onClick={cancelBtn}>Cancel</button>
                </div>
            </form>
        </>
    )
}

export default CreateForm;
