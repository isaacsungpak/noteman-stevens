import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { createNotebook } from "../../store/notebooks";
import ModalFormContainer from "./ModalFormContainer";

function CreateTagForm({ setShowCreateModal }) {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [validError, setValidError] = useState('');

    const submitNotebook = (e) => {
        e.preventDefault();
        // dispatch(createNotebook(title)).then(() => setShowCreateModal(false));
        //Create tag & if errors, set errors to validError
    }

    const cancelBtn = (e) => {
        e.preventDefault();
        setShowCreateModal(false);
    };

    const updateName = (e) => {
        let vError = '';
        const nameString = e.target.value;
        const trimmedName = nameString.replaceAll(/[ ​]+/g, '');
        setName(nameString);

        if (nameString.length > 50) vError ='Name length cannot exceed 50 characters';
        else if (trimmedName.length < 1) vError = 'Name must contain at least 1 non-space character';
        setValidError(vError);
    }

    return (
        <ModalFormContainer>
            <div id="title">Create a new tag</div>
            <div id="instructions" className={validError === '' ? '' : "bad"}>
                {validError === '' ? 'Enter tag name' : validError}
            </div>
            <form onSubmit={submitNotebook}>
                <input
                    onChange={updateName}
                    value={name}
                    type='text'
                    placeholder='Title'
                />
                <div id="button-holder">
                    <button disabled={name === '' || validError !== ''}>Submit</button>
                    <button onClick={cancelBtn}>Cancel</button>
                </div>
            </form>
        </ModalFormContainer>
    )
}

export default CreateTagForm;
