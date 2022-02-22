import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { useState, useEffect, useMemo, useCallback } from "react";
import debounce from 'lodash.debounce';
import { getTagsByNote, updateNote } from "../store/notes";

const defaultNote = {
    id: 2,
    title: "Please select a note",
    content: "Please?"
}

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
        margin-bottom: 5px;
    }

    #save-message {
        font-size: 12px;
        width: 100%;
        text-align: right;
        margin-bottom: 5px;
        color: #CCC;
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

function NoteContainer({ note=defaultNote }) {
    const dispatch = useDispatch();

    const tags = useSelector(state => state.tags.tags);
    const noteTags = useSelector(state => state.notes.noteTagRelations[note.id]) || {};

    const [noteTitle, setNoteTitle] = useState(note.title);
    const [noteContent, setNoteContent] = useState(note.content);
    const [saveState, setSaveState] = useState(1);
    const [tagSelect, setTagSelect] = useState(0);
    const [noteTagsLoaded, setNoteTagsLoaded] = useState(false);

    useEffect(() => {
        dispatch(getTagsByNote(note.id))
            .then(() => setNoteTagsLoaded(true));
    }, [dispatch, note.id])

    const submitTag = () => {
        return;
    }

    const debouncedUpdate = useMemo(
        () =>
          debounce((noteTitle, noteContent, note) => {
            dispatch(updateNote(noteTitle, noteContent, note.id))
                .then(() => setSaveState(1))
                .catch(async(res) => {
                    const data = await res.json();
                    if (data && data.errors) setSaveState(3);
                })
          }, 1000),
        [dispatch]
    )

    const updateTitle = useCallback(
        e => {
            const changedTitle = e.target.value;
            if (changedTitle.length <= 50) {
                setNoteTitle(changedTitle);
                setSaveState(2);
                debouncedUpdate(noteTitle, noteContent, note);
            }
        }, [noteTitle, noteContent, debouncedUpdate, note]
    )

    const updateContent = useCallback(
        e => {
            const changedContent = e.target.value;
            setNoteContent(changedContent);
            setSaveState(2);
            debouncedUpdate(noteTitle, noteContent, note);
        }, [noteTitle, noteContent, debouncedUpdate, note]
    )

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
                value={noteTitle}
                onChange={updateTitle}
                disabled={note.id === 0}
            />
            <textarea
                id='content'
                placeholder="Content"
                value={noteContent}
                onChange={updateContent}
                disabled={note.id === 0}
            />
            { note.id !== 0 &&
                <div id="save-message">
                    {saveState === 1 ? "Saved" : saveState === 2 ? "Saving..." : "Something went wrong"}
                </div>
            }
            <div id='tag-section'>
                <select defaultValue={0} id='tag-selector' onChange={addTag} disabled={note.id === 0}>
                    <option
                        value={0}
                        disabled
                    >
                        Select a tag
                    </option>
                </select>
                {noteTagsLoaded && "Hi"}
            </div>
        </Container>
    )
}

export default NoteContainer;
