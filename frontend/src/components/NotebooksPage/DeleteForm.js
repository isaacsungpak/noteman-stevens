import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import * as notebookActions from '../../store/notebooks';

function DeleteForm({ notebook, setShowDeleteModal }) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const username = user.username;

    const [confirmString, setConfirmString] = useState('');
    const [validErrors, setValidErrors] = useState([]);

    const submitDeleteReq = (e) => {
        e.preventDefault();
        dispatch(notebookActions.deleteNotebook(notebook.id));
        setShowDeleteModal(false);
    }

    const cancelBtn = (e) => {
        e.preventDefault();
        setShowDeleteModal(false);
    }

    useEffect(() => {
        const errors = [];
        if (confirmString !== `${username}/${notebook.title}`) errors.push("Incorrect phrase");

        setValidErrors(errors);
    }, [confirmString, username, notebook.title])

    return (
        <>
            <p>Delete</p>
            <p>{`To confirm, type "${username}/${notebook.title}" in the box below.`}</p>
            <form onSubmit={submitDeleteReq}>
                <input onChange={(e) => setConfirmString(e.target.value)} value={confirmString} type='text' placeholder='username/notebook-name' />
                <button onClick={cancelBtn}>Cancel</button>
                <button disabled={validErrors.length > 0}>Confirm</button>
            </form>
        </>
    )

}

export default DeleteForm;
