import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { useState, useEffect, useMemo, useCallback } from "react";
import debounce from 'lodash.debounce';
import { getTagsByNote, updateNote } from "../../store/notes";
import { createNoteTag } from "../../store/notes";
import TagTab from "./TagTab";

const Container = styled.div`
    height: calc(100% - 10px);
    width: calc(100% - 340px);
    background-color: #f4f2f7;
    position: absolute;
    left: 320px;
    overflow-y: hidden;
    padding: 10px 10px 0 10px;

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
        color: ${props => props.error ? '#cc004e' : '#aaa' };
    }

    #tag-section {
        height: 71px;
        padding: 10px 0;
        border-top: 1px solid #CCC;
        display: flex;
        gap: 5px;
        flex-wrap: wrap;
        overflow-y: auto;
    }

    #tag-selector {
        width: 200px;
        height: 28px;
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

    const tags = useSelector(state => state.tags.tags);
    const noteTags = useSelector(state => state.notes.noteTagRelations);

    const noteId = note.id;
    const [noteTitle, setNoteTitle] = useState(note.title);
    const [noteContent, setNoteContent] = useState(note.content);
    const [saveState, setSaveState] = useState(1);
    const [selectedTag, setSelectedTag] = useState(0);
    const [noteTagsLoaded, setNoteTagsLoaded] = useState(false);

    useEffect(() => {
        if (note.id !== 0) {
            dispatch(getTagsByNote(note.id))
                .then(() => setNoteTagsLoaded(true));
        }
    }, [dispatch, note.id])

    useEffect(() => {
        setNoteTitle(note.title);
        setNoteContent(note.content);
    }, [note])

    const debouncedUpdate = useMemo(
        () =>
          debounce((title, content, noteId) => {
            dispatch(updateNote(title, content, noteId))
                .then(() => setSaveState(1))
                .catch(async(res) => {
                    const data = await res.json();
                    if (data && data.errors) setSaveState(3);
                })
          }, 500),
        [dispatch]
    )

    const updateTitle = useCallback(
        e => {
            const changedTitle = e.target.value;
            if (changedTitle.length <= 50) {
                setNoteTitle(changedTitle);
                setSaveState(2);
                debouncedUpdate(changedTitle, noteContent, noteId);
            }
        }, [noteContent, debouncedUpdate, noteId]
    )

    const updateContent = useCallback(
        e => {
            const changedContent = e.target.value;
            setNoteContent(changedContent);
            setSaveState(2);
            debouncedUpdate(noteTitle, changedContent, noteId);
        }, [noteTitle, debouncedUpdate, noteId]
    )

    const addTag = (e) => {
        const selectVal = e.target.value;
        if (selectVal !== 0) {
            setSelectedTag(selectedTag);
            dispatch(createNoteTag(note.id, selectVal))
                .then(() => setSelectedTag(0))
        }
    }

    return  (
        <Container error={saveState === 3}>
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
            {
                note.id !== 0 &&
                <div id="save-message">
                    { saveState === 1 ? "Saved" : saveState === 2 ? "Saving..." : "Something went wrong" }
                </div>
            }
            <div id='tag-section'>
                <select
                    id='tag-selector'
                    disabled={note.id === 0}
                    value={selectedTag}
                    onChange={addTag}
                >
                    <option
                        value={0}
                        disabled
                    >
                        Select a tag
                    </option>
                    {
                        Object.values(tags).filter(tag => (!noteTags[noteId] || !noteTags[noteId][tag.id])).map(tag => (
                            <option value={tag.id} key={`tag${tag.id}`}>
                                {tag.title}
                            </option>
                        ))
                    }
                </select>
                {
                    (noteTagsLoaded && noteTags[noteId]) && Object.values(noteTags[noteId]).map(tag => (
                        <>
                            <TagTab noteId={noteId} tagId={tag.tagId} key={`n${noteId}-t${tag.tagId}`}/>
                            <TagTab noteId={noteId} tagId={tag.tagId} key={`n${noteId}-t${tag.tagId}`}/>
                            <TagTab noteId={noteId} tagId={tag.tagId} key={`n${noteId}-t${tag.tagId}`}/>
                            <TagTab noteId={noteId} tagId={tag.tagId} key={`n${noteId}-t${tag.tagId}`}/>
                            <TagTab noteId={noteId} tagId={tag.tagId} key={`n${noteId}-t${tag.tagId}`}/>
                            <TagTab noteId={noteId} tagId={tag.tagId} key={`n${noteId}-t${tag.tagId}`}/>
                            <TagTab noteId={noteId} tagId={tag.tagId} key={`n${noteId}-t${tag.tagId}`}/>
                            <TagTab noteId={noteId} tagId={tag.tagId} key={`n${noteId}-t${tag.tagId}`}/>
                            <TagTab noteId={noteId} tagId={tag.tagId} key={`n${noteId}-t${tag.tagId}`}/>
                            <TagTab noteId={noteId} tagId={tag.tagId} key={`n${noteId}-t${tag.tagId}`}/>
                            <TagTab noteId={noteId} tagId={tag.tagId} key={`n${noteId}-t${tag.tagId}`}/>
                            <TagTab noteId={noteId} tagId={tag.tagId} key={`n${noteId}-t${tag.tagId}`}/>
                            <TagTab noteId={noteId} tagId={tag.tagId} key={`n${noteId}-t${tag.tagId}`}/>
                            <TagTab noteId={noteId} tagId={tag.tagId} key={`n${noteId}-t${tag.tagId}`}/>
                            <TagTab noteId={noteId} tagId={tag.tagId} key={`n${noteId}-t${tag.tagId}`}/>
                            <TagTab noteId={noteId} tagId={tag.tagId} key={`n${noteId}-t${tag.tagId}`}/>
                            <TagTab noteId={noteId} tagId={tag.tagId} key={`n${noteId}-t${tag.tagId}`}/>
                            <TagTab noteId={noteId} tagId={tag.tagId} key={`n${noteId}-t${tag.tagId}`}/>
                            <TagTab noteId={noteId} tagId={tag.tagId} key={`n${noteId}-t${tag.tagId}`}/>
                            <TagTab noteId={noteId} tagId={tag.tagId} key={`n${noteId}-t${tag.tagId}`}/>
                            <TagTab noteId={noteId} tagId={tag.tagId} key={`n${noteId}-t${tag.tagId}`}/>
                            <TagTab noteId={noteId} tagId={tag.tagId} key={`n${noteId}-t${tag.tagId}`}/>
                            <TagTab noteId={noteId} tagId={tag.tagId} key={`n${noteId}-t${tag.tagId}`}/>
                            <TagTab noteId={noteId} tagId={tag.tagId} key={`n${noteId}-t${tag.tagId}`}/>
                            <TagTab noteId={noteId} tagId={tag.tagId} key={`n${noteId}-t${tag.tagId}`}/>
                            <TagTab noteId={noteId} tagId={tag.tagId} key={`n${noteId}-t${tag.tagId}`}/>
                            <TagTab noteId={noteId} tagId={tag.tagId} key={`n${noteId}-t${tag.tagId}`}/>
                            <TagTab noteId={noteId} tagId={tag.tagId} key={`n${noteId}-t${tag.tagId}`}/>
                            <TagTab noteId={noteId} tagId={tag.tagId} key={`n${noteId}-t${tag.tagId}`}/>
                            <TagTab noteId={noteId} tagId={tag.tagId} key={`n${noteId}-t${tag.tagId}`}/>
                            <TagTab noteId={noteId} tagId={tag.tagId} key={`n${noteId}-t${tag.tagId}`}/>
                            <TagTab noteId={noteId} tagId={tag.tagId} key={`n${noteId}-t${tag.tagId}`}/>
                            <TagTab noteId={noteId} tagId={tag.tagId} key={`n${noteId}-t${tag.tagId}`}/>
                            <TagTab noteId={noteId} tagId={tag.tagId} key={`n${noteId}-t${tag.tagId}`}/>
                            <TagTab noteId={noteId} tagId={tag.tagId} key={`n${noteId}-t${tag.tagId}`}/>
                            <TagTab noteId={noteId} tagId={tag.tagId} key={`n${noteId}-t${tag.tagId}`}/>
                            <TagTab noteId={noteId} tagId={tag.tagId} key={`n${noteId}-t${tag.tagId}`}/>
                            <TagTab noteId={noteId} tagId={tag.tagId} key={`n${noteId}-t${tag.tagId}`}/>
                            <TagTab noteId={noteId} tagId={tag.tagId} key={`n${noteId}-t${tag.tagId}`}/>
                            <TagTab noteId={noteId} tagId={tag.tagId} key={`n${noteId}-t${tag.tagId}`}/>
                            <TagTab noteId={noteId} tagId={tag.tagId} key={`n${noteId}-t${tag.tagId}`}/>
                            <TagTab noteId={noteId} tagId={tag.tagId} key={`n${noteId}-t${tag.tagId}`}/>
                        </>
                    ))
                }
            </div>
        </Container>
    )
}

export default NoteContainer;
