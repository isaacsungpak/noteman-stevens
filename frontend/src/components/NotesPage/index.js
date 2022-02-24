import { getNotes } from "../../store/notes";
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import exampleNote from "../ExampleNote";
import NoteBar from "../NoteBar";
import NoteTab from "../NoteTab";
import NoteContainer from "../NoteContainer";

const useQuery = () => {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

function NotesPage() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedNote, setSelectedNote] = useState(exampleNote);

    let query = useQuery();
    const searchKey = query.get("key");

    useEffect(() => {
        dispatch(getNotes(searchKey || '')).then(() => setIsLoaded(true));
    }, [dispatch, searchKey])

    const notes = useSelector(state => state.notes.notes);
    const orderedNotes = Object.values(notes).sort((a,b) => (new Date(b.updatedAt) - new Date(a.updatedAt)));

    return (
        <>
            <NoteBar>
                {
                    isLoaded &&
                    orderedNotes.map((note, idx) => (
                        <NoteTab
                            note={note}
                            isSelected={selectedNote.id === note.id}
                            setSelectedNote={setSelectedNote}
                            key={idx}
                        />
                    ))
                }
            </NoteBar>
            <NoteContainer note={selectedNote ? selectedNote : exampleNote} />
        </>
    );
}

export default NotesPage;
