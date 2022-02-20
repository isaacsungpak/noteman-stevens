import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { createNotebook } from "../../store/notebooks";
import ModalFormContainer from "./ModalFormContainer";

function CreateNotebookForm({ notebooks, setShowCreateModal }) {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [validError, setValidError] = useState('');

    const submitNotebook = (e) => {
        e.preventDefault();
        dispatch(createNotebook(title)).then(() => setShowCreateModal(false));
    }

    const cancelBtn = (e) => {
        e.preventDefault();
        setShowCreateModal(false);
    };

    const updateTitle = (e) => {
        let vError = '';
        const titleString = e.target.value;
        const trimmedTitle = titleString.replaceAll(/[ ​]+/g, '');
        setTitle(titleString);

        if (titleString.length > 50) vError ='Title length cannot exceed 50 characters';
        else if (trimmedTitle.length < 1) vError = 'Title must contain at least 1 non-space character';
        setValidError(vError);
    }

    return (
        <ModalFormContainer>
            <div id="title">Create a new notebook</div>
            <div id="instructions" className={validError === '' ? '' : "bad"}>
                {validError === '' ? 'Enter notebook title' : validError}
            </div>
            <form onSubmit={submitNotebook}>
                <input
                    onChange={updateTitle}
                    value={title}
                    type='text'
                    placeholder='Title'
                />
                <div id="button-holder">
                    <button disabled={title === '' || validError !== ''}>Submit</button>
                    <button onClick={cancelBtn}>Cancel</button>
                </div>
            </form>
        </ModalFormContainer>
    )
}

export default CreateNotebookForm;
