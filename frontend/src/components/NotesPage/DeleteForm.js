import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import * as noteActions from '../../store/notes';

function DeleteForm({ note, setShowDeleteModal, deletePackage }) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const username = user.username;
    const noteId = note.id;
    const { selectedNote, setSelectedNote, setPadTitle, setPadContent } = deletePackage;

    const [confirmString, setConfirmString] = useState('');
    const [validErrors, setValidErrors] = useState([]);

    const submitDeleteReq = (e) => {
        e.preventDefault();
        dispatch(noteActions.deleteNote(noteId));
        setShowDeleteModal(false);
        if (noteId === selectedNote) {
            setSelectedNote('');
            setPadTitle('');
            setPadContent('');
        }
    }

    const cancelBtn = (e) => {
        e.preventDefault();
        setShowDeleteModal(false);
    }

    useEffect(() => {
        const errors = [];
        if (confirmString !== `${username}/${note.title || 'Untitled'}`) errors.push("Incorrect phrase");

        setValidErrors(errors);
    }, [confirmString, username, note.title])

    return (
        <>
            <p className="modal-title">Delete</p>
            <p className="modal-message">To confirm, type "<b>{`${username}/${note.title || 'Untitled'}`}</b>":</p>
            <form onSubmit={submitDeleteReq}>
                <input onChange={(e) => setConfirmString(e.target.value)} value={confirmString} type='text' placeholder='username/note-name' />
                <div className="submit-cancel-button-holder">
                    <button disabled={validErrors.length > 0} id={validErrors.length > 0 ? 'disabled' : undefined}>Confirm</button>
                    <button onClick={cancelBtn}>Cancel</button>
                </div>
            </form>
        </>
    )

}

export default DeleteForm;
