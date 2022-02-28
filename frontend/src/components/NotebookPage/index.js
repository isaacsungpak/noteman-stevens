import { getNotesFromNotebook } from "../../store/notes";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import exampleNote from "../NoteComponents/ExampleNote";
import NoteBar from "../NoteComponents/NoteBar";
import NoteTab from "../NoteComponents/NoteTab";
import NoteContainer from "../NoteComponents/NoteContainer";
import { useParams } from "react-router-dom";
import NoNotesMessage from "../NoteComponents/NoNotesMessage";

function NoteBookPage() {
    const dispatch = useDispatch();
    const { notebookId } = useParams();
    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedNote, setSelectedNote] = useState(exampleNote);

    useEffect(() => {
        setIsLoaded(false);
        dispatch(getNotesFromNotebook(notebookId)).then(() => setIsLoaded(true));
    }, [dispatch, notebookId])

    const notes = useSelector(state => state.notes.notes);
    const orderedNotes = Object.values(notes).sort((a,b) => (new Date(b.updatedAt) - new Date(a.updatedAt)));

    return (
        <>
            <NoteBar>
                {
                    isLoaded &&
                        orderedNotes.length > 0 ?
                            orderedNotes.map((note, idx) => (
                                <NoteTab
                                    note={note}
                                    selectedNoteId={selectedNote.id}
                                    setSelectedNote={setSelectedNote}
                                    key={idx}
                                />
                            )) :
                            <NoNotesMessage />
                }
            </NoteBar>
            <NoteContainer note={selectedNote ? selectedNote : exampleNote} />
        </>
    );
}

export default NoteBookPage;
