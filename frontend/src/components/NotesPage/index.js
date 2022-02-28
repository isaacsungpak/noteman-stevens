import { getNotes } from "../../store/notes";
import { useLocation } from "react-router-dom";
import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import exampleNote from "../NoteComponents/ExampleNote";
import NoteBar from "../NoteComponents/NoteBar";
import NoteTab from "../NoteComponents/NoteTab";
import NoteContainer from "../NoteComponents/NoteContainer";

const useQuery = () => {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
}

function NotesPage() {
    const dispatch = useDispatch();
    const notes = useSelector(state => state.notes.notes);
    const [isLoaded, setIsLoaded] = useState(false);

    const [selectedNote, setSelectedNote] = useState(exampleNote);

    let query = useQuery();
    const searchKey = query.get("key");

    useEffect(() => {
        dispatch(getNotes(searchKey || '')).then(() => setIsLoaded(true));
    }, [dispatch, searchKey])

    return (
        <>
            <NoteBar>
                {
                    isLoaded &&
                    Object.values(notes).sort((a,b) => (new Date(b.updatedAt) - new Date(a.updatedAt))).map((note, idx) => (
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
