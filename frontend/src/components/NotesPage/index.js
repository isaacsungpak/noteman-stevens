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

    const [noteName, setNoteName] = useState('');
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
        b.updatedAt.slice(17,19) - a.updatedAt.slice(17,19)))
        .slice(0,11);

    return (
        <>
            {!user && <Redirect to="/" />}
            <div id="note-page-container">
                <div id="notes-collection-container">
                    <div id='notes-page-top-bar'>
                        <div id='notes-header'>Notes</div>
                        <form>
                            <input onChange={(e) => setNoteName(e.target.value)} value={noteName} type='text' placeholder='Searchman' />
                        </form>
                    </div>

                    <div className='note-grid-top'>
                        <p id='note-count'>{`${notes.length ? notes.length : 0} notes`}</p>
                        {/* <button className="new-note-btn" onClick={() => setShowCreateModal(true)}>
                            New Note
                        </button> */}
                        {/* {showCreateModal && <CreateModal notebooks={notebooks} setShowCreateModal={setShowCreateModal}/>} */}
                    </div>

                    <div className='note-grid'>
                        <table>
                            <thead>
                                <tr className="odd-row">
                                    <th className="note-title">TITLE</th>
                                    <th className="note-author">LOCATED IN</th>
                                    <th className="note-created">CREATED ON</th>
                                    <th className="note-updated">UPDATED</th>
                                    <th className="note-actions">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* {visibleNotes.length > 0 && visibleNotes.map((note, i) =>
                                        <tr key={i} className={i % 2 === 0 ? "even-row" : "odd-row"}>
                                            <td className="note-title">{note.title}</td>
                                            <td className="note-author">{note.Notebook.title}</td>
                                            <td className="note-created">{`${note.createdAt.slice(5,7)}/${note.createdAt.slice(8,10)}/${note.createdAt.slice(0,4)}`}</td>
                                            <td className="note-updated">{`${note.updatedAt.slice(5,7)}/${note.updatedAt.slice(8,10)}/${note.updatedAt.slice(0,4)}`}</td>
                                        </tr>
                                )} */}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div id="notepad-container">
                    <input type="text" placeholder="Note title"/>
                    <textarea placeholder="Note content"></textarea>
                </div>
            </div>
        </>
    )
}

export default NotesPage;
