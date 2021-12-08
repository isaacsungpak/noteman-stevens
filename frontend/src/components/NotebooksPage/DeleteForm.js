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
            <p className="modal-title">Delete</p>
            <p className="modal-message">To confirm, type "<b>{`${username}/${notebook.title}`}</b>":</p>
            <form onSubmit={submitDeleteReq}>
                <input onChange={(e) => setConfirmString(e.target.value)} value={confirmString} type='text' placeholder='username/notebook-name' />
                <div className="submit-cancel-button-holder">
                    <button disabled={validErrors.length > 0} id={validErrors.length > 0 ? 'disabled' : undefined}>Confirm</button>
                    <button onClick={cancelBtn}>Cancel</button>
                </div>
            </form>
        </>
    )

}

export default DeleteForm;
