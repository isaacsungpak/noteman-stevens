import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as noteActions from '../../store/notes';
// import ActionsButton from './ActionsButton'
import './NotesPage.css';

function NotesPage() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const notes = useSelector((state) => state.note.notes);
    // const [showCreateModal, setShowCreateModal] = useState('');

    useEffect(() => {
        dispatch(noteActions.getAllNotes());
    }, [dispatch])

    let visibleNotes = notes.sort((a,b) => (
        b.updatedAt.slice(0,4) - a.updatedAt.slice(0,4) ||
        b.updatedAt.slice(5,7) - a.updatedAt.slice(5,7) ||
        b.updatedAt.slice(8,10) - a.updatedAt.slice(8,10) ||
        b.updatedAt.slice(11,13) - a.updatedAt.slice(11,13) ||
        b.updatedAt.slice(14,16) - a.updatedAt.slice(14,16) ||
        b.updatedAt.slice(17,19) - a.updatedAt.slice(17,19)));

    const [selectedNote, setSelectedNote] = useState(visibleNotes[0]?.id);
    const [noteSearch, setNoteSearch] = useState('');
    const [noteTitle, setNoteTitle] = useState('');
    const [padTitle, setPadTitle] = useState('');
    const [noteContent, setNoteContent] = useState('');
    const [padContent, setPadContent] = useState('');

    useEffect(() => {
        if (notes && notes.length) {
            const selected = notes.find(note => note.id === selectedNote);
            setNoteTitle(selected.title);
            setNoteContent(selected.content);
        }
    }, [selectedNote])

    useEffect(() => {
        setPadTitle(noteTitle);
        setPadContent(noteContent);
    }, [noteTitle, noteContent])

    

    return (
        <>
            {!user && <Redirect to="/" />}
            <div id="note-page-container">
                <div id="notes-collection-container">
                    <div id='notes-page-top-bar'>
                        <div id='notes-header'>Notes</div>
                        <form>
                            <input onChange={(e) => setNoteSearch(e.target.value)} value={noteSearch} type='text' placeholder='Searchman' />
                        </form>
                    </div>

                    <div className='note-page-grid-top'>
                        <p id='note-count'>{`${notes.length ? notes.length : 0} notes`}</p>
                            <button className="new-note-btn" onClick={() => console.log('new note!')}>
                                <i className="fas fa-plus"></i>
                            </button>
                        {/* {showCreateModal && <CreateModal notebooks={notebooks} setShowCreateModal={setShowCreateModal}/>} */}
                    </div>
                    <div className='note-collection'>
                        {notes.length > 0 && notes.map((note, i) => (
                            <div key={i} className="note-instance" onClick={() => setSelectedNote(note.id)} id={selectedNote === note.id ? 'selected-note' : undefined}>
                                <div className='title-holder'>
                                    <p className="note-instance-title">{selectedNote === note.id ? (padTitle || <i>Untitled</i>) : (note.Notebook.title || <i>Untitled</i>)}</p>
                                </div>
                                <div className='excerpt-holder'>
                                    <p className="note-instance-excerpt">{selectedNote === note.id ?
                                        (padContent.length >= 15 ? padContent.slice(0,13) + "..." : (padContent || <i>(no content)</i>))
                                        : (note.content.length >= 15 ? note.content.slice(0,13) + "..." : (note.content || <i>(no content)</i>))}</p>
                                </div>
                                <div className='notebook-holder'>
                                    <p className="note-instance-notebook">({note.Notebook.title})</p>
                                </div>
                                <div className='update-holder'>
                                    <p className="note-instance-update">Updated: {note.updatedAt.slice(5,7)}/{note.updatedAt.slice(8,10)}/{note.updatedAt.slice(0,4)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div id="notepad-container">
                    <input onChange={(e) => setPadTitle(e.target.value)} value={padTitle} type="text" placeholder="Note title" className='note-page-title-input'/>
                    <textarea onChange={(e) => setPadContent(e.target.value)} value={padContent} placeholder="Note content" disabled={notes.length === 0} className='note-page-content-input'></textarea>
                </div>
            </div>
        </>
    )
}

export default NotesPage;
