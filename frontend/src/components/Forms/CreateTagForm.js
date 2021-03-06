import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { createTag } from "../../store/tags";
import ModalFormContainer from "./ModalFormContainer";

function CreateTagForm({ setShowModal }) {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [validError, setValidError] = useState('');

    const submitNotebook = (e) => {
        e.preventDefault();
        dispatch(createTag(title))
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

        if (titleString.length > 50) vError ='Name length cannot exceed 50 characters';
        else if (trimmedTitle.length < 1) vError = 'Name must contain at least 1 non-space character';
        setValidError(vError);
    }

    return (
        <ModalFormContainer>
            <div id="title">Create a New Tag</div>
            <div id="instructions" className={validError === '' ? '' : "bad"}>
                {validError === '' ? 'Enter tag name' : validError}
            </div>
            <form onSubmit={submitNotebook}>
                <input
                    onChange={updateTitle}
                    value={title}
                    type='text'
                    placeholder='Name'
                />
                <div id="button-holder">
                    <button disabled={title === '' || validError !== ''}>Create</button>
                    <button onClick={cancelBtn}>Cancel</button>
                </div>
            </form>
        </ModalFormContainer>
    )
}

export default CreateTagForm;
