import { getNotesByTag } from "../../store/notes";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import exampleNote from "../NoteComponents/ExampleNote";
import NoteBar from "../NoteComponents/NoteBar";
import NoteTab from "../NoteComponents/NoteTab";
import NoteContainer from "../NoteComponents/NoteContainer";
import NoNotesMessage from "../NoteComponents/NoNotesMessage";
import TagOption from "./TagOption";

const TagSelect = styled.div`
    width: ${props => props.selected ? "229px" : "calc(100% - 20px)"};
    height: calc(100vh - 20px);
    border-right: ${props => props.selected ? "1px solid #CCC" : "none"};
    background-color: #BFB3D1;
    z-index: 400;
    box-shadow: 0 0 8px rgba(69, 55, 80, 0.2);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 10px;
    padding: 10px;
    overflow-y: auto;
`

const NoTags = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #73648a;
    font-size: 20px;
`

const Page = styled.div`
    width: calc(100vw - 500px);
    position: absolute;
    left: 250px;
    z-index: 300;
`

function TagsPage() {
    const dispatch = useDispatch();
    const tags = useSelector(state => state.tags.tags);
    const notes = useSelector(state => state.notes.notes);
    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedNote, setSelectedNote] = useState(exampleNote);
    const [selectedTagId, setSelectedTagId] = useState(0);

    useEffect(() => {
        if (selectedTagId !== 0) dispatch(getNotesByTag(selectedTagId)).then(() => setIsLoaded(true));
    }, [dispatch, selectedTagId])

    const orderedTags = Object.values(tags).sort();
    const orderedNotes = Object.values(notes).sort((a,b) => (new Date(b.updatedAt) - new Date(a.updatedAt)));

    return (
        <>
            <TagSelect selected={selectedTagId !== 0 && tags[selectedTagId]}>
                {
                    orderedTags.length > 0 ?
                        orderedTags.map(tag => (
                            <TagOption
                                tagId={tag.id}
                                selectedTagId={selectedTagId}
                                setSelectedTagId={setSelectedTagId}
                                key={`tag${tag.id}`}
                            />
                        )) :
                        <NoTags>
                            <div>You currently don't have any tags</div>
                        </NoTags>
                }
            </TagSelect>
            {
                selectedTagId !== 0 && tags[selectedTagId] &&
                <Page>
                    <NoteBar>
                        {
                            isLoaded &&
                                orderedNotes.length > 0 ?
                                    orderedNotes.map((note, idx) => (
                                        <NoteTab
                                            note={note}
                                            isSelected={selectedNote.id === note.id}
                                            setSelectedNote={setSelectedNote}
                                            key={idx}
                                        />
                                    )) :
                                    <NoNotesMessage />
                        }
                    </NoteBar>
                    <NoteContainer className="cont" note={selectedNote ? selectedNote : exampleNote} />
                </Page>
            }
        </>
    );
}

export default TagsPage;
