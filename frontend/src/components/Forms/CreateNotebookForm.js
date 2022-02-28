import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { createNotebook } from "../../store/notebooks";
import ModalFormContainer from "./ModalFormContainer";

function CreateNotebookForm({ setShowModal }) {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [validError, setValidError] = useState('');

    const submitNotebook = (e) => {
        e.preventDefault();
        dispatch(createNotebook(title))
            .then(() => setShowModal(false))
            .catch(async(res) => {
                const data = await res.json();
                if (data && data.errors) setValidError(data.errors[0]);
            });
    }

    const cancelBtn = (e) => {
        e.preventDefault();
        setShowModal(false);
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
            <div id="title">Create a Notebook</div>
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
                    <button disabled={title === '' || validError !== ''}>Create</button>
                    <button onClick={cancelBtn}>Cancel</button>
                </div>
            </form>
        </ModalFormContainer>
    )
}

export default CreateNotebookForm;
