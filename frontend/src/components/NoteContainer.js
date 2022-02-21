import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { useState, useEffect } from "react";

const Container = styled.div`
    height: calc(100% - 20px);
    width: calc(100% - 340px);
    background-color: #f4f2f7;
    position: absolute;
    left: 320px;
    overflow-y: hidden;
    padding: 10px;

    display: flex;
    flex-direction: column;

    input, textarea {
        border: 0;
        border-radius: 0;
        outline: none;
        font-family: 'Montserrat', sans-serif;
        background-color: transparent;
        width: 100%;
        padding: 0;

        ::placeholder {
            color: #CCC;
        }
    }

    #title {
        font-size: 20px;
        border-bottom: 1px solid #BBB;
    }

    #content {
        font-size: 16px;
        flex: 1;
        margin-top: 10px;
        resize: none;
        margin-bottom: 10px;
    }

    #tag-section {
        height: 50px;
        padding-top: 10px;
        border-top: 1px solid #CCC;
    }

    #tag-selector {
        width: 200px;
        background-color: #CCC;
        padding: 5px;
        border: 0;
        border-radius: 15px;
        outline: none;
        font-family: 'Montserrat', sans-serif;
    }

    #tag {

    }
`

function NoteContainer({ note }) {
    const dispatch = useDispatch();

    const [tagSelect, setTagSelect] = useState(0);
    const [noteTitle, setNoteTitle] = useState(note?.content);
    const [noteContent, setNoteContent] = useState(note?.content);

    const submitTag = () => {
        return;
    }

    const updateTitle = (e) => {

    }

    const updateContent = (e) => {

    }

    const addTag = (e) => {
        const selectVal = e.target.value;
        if (selectVal !== 0) return;
    }

    return  (
        <Container>
            <input
                type='text'
                id='title'
                placeholder="Title"
            />
            <textarea
                id='content'
                placeholder="Content"
            />
            <div id='tag-section'>
                <select defaultValue={0} id='tag-selector' onChange={addTag}>
                    <option
                        value={0}
                        disabled
                    >
                        Select a tag
                    </option>
                </select>
                {}
            </div>
        </Container>
    )
}

export default NoteContainer;
