import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as noteActions from '../../store/notes';
import CreateModal from './CreateModal';
import './NotesPage.css';
import DeleteButton from './DeleteButton';

function NotesPage() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const notes = useSelector((state) => state.note.notes);

    const [selectedNote, setSelectedNote] = useState('');
    const [padTitle, setPadTitle] = useState('');
    const [padContent, setPadContent] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [noteSearch, setNoteSearch] = useState('');
    const [visibleNotes, setVisibleNotes] = useState([]);

    useEffect(() => {
        dispatch((noteActions.getAllNotes()));
        if (notes && notes.length && selectedNote !== '') {
            const selected = notes.find(note => note.id === selectedNote);
            setPadTitle(selected.title);
            setPadContent(selected.content);
        }
    }, [dispatch, selectedNote])

    useEffect(() => {
        if (selectedNote !== '') dispatch(noteActions.updateNote((padTitle.length ? padTitle : ''), (padContent.length ? padContent : ''), Number(selectedNote)))
    }, [dispatch, padTitle, padContent]);

    useEffect(() => {
        let lowercaseSearch = noteSearch.toLowerCase();
        if (notes.length > 0) setVisibleNotes(
            notes.filter(n => (n.title.toLowerCase().includes(lowercaseSearch) || n.content.toLowerCase().includes(lowercaseSearch)))
                .sort(
                    (a,b) => (
                        b.updatedAt.slice(0,4) - a.updatedAt.slice(0,4) ||
                        b.updatedAt.slice(5,7) - a.updatedAt.slice(5,7) ||
                        b.updatedAt.slice(8,10) - a.updatedAt.slice(8,10) ||
                        b.updatedAt.slice(11,13) - a.updatedAt.slice(11,13) ||
                        b.updatedAt.slice(14,16) - a.updatedAt.slice(14,16) ||
                        b.updatedAt.slice(17,19) - a.updatedAt.slice(17,19))
                )
        );
    }, [noteSearch, notes])

    return (
        <>
            {!user && <Redirect to="/" />}
            <div id="note-page-container">
                <div id="notes-collection-container">
                    <div id='notes-page-top-bar'>
                        <div id='notes-header'>All Notes</div>
                        <form>
                            <input onChange={(e) => setNoteSearch(e.target.value)} value={noteSearch} type='text' placeholder='Searchman' />
                        </form>
                    </div>

                    <div className='note-page-grid-top'>
                        <p id='note-count'>{`${notes.length ? notes.length : 0} notes`}</p>
                            <button className="new-note-btn" onClick={() => setShowCreateModal(true)}>
                                <i className="fas fa-plus"></i>
                            </button>
                        {showCreateModal && <CreateModal setShowCreateModal={setShowCreateModal}/>}
                    </div>
                    <div className='note-collection'>
                        {notes.length > 0 && visibleNotes.map((note, i) => (
                            <div key={i} className="note-instance" onClick={() => setSelectedNote(note.id)} id={selectedNote === note.id ? 'selected-note' : undefined}>
                                <div className='title-holder'>
                                    <p className="note-instance-title">{selectedNote === note.id ? (padTitle || <i>Untitled</i>) : (note.title || <i>Untitled</i>)}</p>
                                    <DeleteButton note={note} deletePackage={{selectedNote, setSelectedNote, setPadTitle, setPadContent}}/>
                                </div>
                                <div className='excerpt-holder'>
                                    <p className="note-instance-excerpt">{selectedNote === note.id ?
                                        (padContent.length > 20 ? padContent.slice(0,21) + "..." : (padContent || <i>(no content)</i>))
                                        : (note.content.length > 20 ? note.content.slice(0,21) + "..." : (note.content || <i>(no content)</i>))}</p>
                                </div>
                                <div className='notebook-holder'>
                                    <p className="note-instance-notebook">({note.Notebook.title.length > 20 ? note.Notebook.title.slice(0,21) + '...' : note.Notebook.title})</p>
                                </div>
                                <div className='update-holder'>
                                    <p className="note-instance-update">Updated: {note.updatedAt.slice(5,7)}/{note.updatedAt.slice(8,10)}/{note.updatedAt.slice(0,4)}</p>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
                <div id="notepad-container">
                    <input onChange={(e) => setPadTitle(e.target.value)} value={padTitle} type="text" placeholder="Note title" disabled={selectedNote === ''} className='note-page-title-input'/>
                    <textarea onChange={(e) => setPadContent(e.target.value)} value={padContent} placeholder="Note content" disabled={selectedNote === ''} className='note-page-content-input'></textarea>
                </div>
            </div>
        </>
    )
}

export default NotesPage;
