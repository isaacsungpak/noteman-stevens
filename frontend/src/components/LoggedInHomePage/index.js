import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as notebookActions from '../../store/notebooks';
import * as noteActions from '../../store/notes';
import { Link } from "react-router-dom";
import CreateModal from './CreateModal';
import './LoggedInHomePage.css';

import NoteTab from "../NoteTab";
import NoteBar from "../NoteBar";

function LoggedInHomePage({ sessionUser }) {
    const dispatch = useDispatch();
    const notebooks = useSelector((state) => state.notebooks.notebooks);
    const notes = useSelector((state) => state.notes.notes);
    const [numNotebooks, setNumNotebooks] = useState(0);
    const [numNotes, setNumNotes] = useState(0);

    const [mostPopularNotebook, setMostPopularNotebook] = useState('');
    const [notesInPopularNotebook, setNotesInPopularNotebook] = useState('');

    const [padContent, setPadContent] = useState('');

    const [showCreateModal, setShowCreateModal] = useState(false);

    useEffect(() => {
        dispatch(notebookActions.getNotebooks());
        dispatch(noteActions.getAllNotes());
    }, [dispatch]);

    useEffect(() => {
        setNumNotebooks(notebooks.length);
        setNumNotes(notes.length);

        if (notebooks.length > 0 && notes.length > 0) {
            const notesInNotebooks = notes.reduce((count, note) => {
                count[note.notebookId] = count[note.notebookId] ? count[note.notebookId] + 1 : 1;
                return count;
            }, {});

            const sortableNotebooks  = [];
            for (let nbId in notesInNotebooks) sortableNotebooks.push([nbId, notesInNotebooks[nbId]]);
            const sortedNotebooks = sortableNotebooks.sort((a,b) => (b[1] - a[1]));
            const mostPopular = notebooks.find(nb => nb.id === +sortedNotebooks[0][0]); // issue: doesn't account for a tie
            setMostPopularNotebook(mostPopular);
            setNotesInPopularNotebook(sortedNotebooks[0][1]);
        }
    }, [notes, notebooks])

    return (
        <div id='logged-in-home-container'>
            <NoteBar>
                <NoteTab isSelected={false} />
                <NoteTab isSelected={false} />
                <NoteTab isSelected={false} />
                <NoteTab isSelected={false} />
                <NoteTab isSelected={false} />
                <NoteTab isSelected={false} />
                <NoteTab isSelected={false} />
                {/* <NoteTab isSelected={false} />
                <NoteTab isSelected={false} />
                <NoteTab isSelected={false} />
                <NoteTab isSelected={false} />
                <NoteTab isSelected={false} />
                <NoteTab isSelected={false} />
                <NoteTab isSelected={false} />
                <NoteTab isSelected={false} />
                <NoteTab isSelected={false} />
                <NoteTab isSelected={false} /> */}
                <NoteTab isSelected={false} />
                <NoteTab isSelected={true} />
                <NoteTab isSelected={false} />
            </NoteBar>

            <div id='stats-holder'>
                <p id='welcome-user'>Hey, {sessionUser.username}!</p>
                <br />
                <p className='stat-line'><span className="stat-category">Number of Notebooks:</span> {numNotebooks}</p>
                <p className='stat-line'><span className="stat-category">Number of Notes:</span> {numNotes}</p>
                <p className='stat-line'><span className="stat-category">Avg. Notes per Notebook:</span> {(numNotes / (numNotebooks || 1)).toFixed(2)}</p>

                <br />
                <p className='stat-line'><span className="stat-category">Most Popular Notebook:</span><br />
                    {mostPopularNotebook === '' ?
                        <i> N/A</i>
                        : <><b><Link to={`notebooks/${mostPopularNotebook.id}`}>{mostPopularNotebook.title}</Link></b><i className="stat-line-detail"> ({notesInPopularNotebook} notes)</i></>}
                </p>
                <br />

            </div>

            <div id="scratchpad-container">
                <div id='scratchpad'>
                    <p id='scratchpad-title'>Scratch Pad</p>
                    <textarea onChange={(e) => setPadContent(e.target.value)} value={padContent} placeholder="Note content" className='note-page-content-input' id='scratchpad-content'></textarea>
                </div>
                <br />
                <button onClick={() => setShowCreateModal(true)} disabled={padContent.length === 0} id={padContent.length > 0 ? undefined : 'disabled'}>Save</button>
                {showCreateModal && <CreateModal content={padContent} setShowCreateModal={setShowCreateModal}/>}
            </div>
        </div>
    )
}

export default LoggedInHomePage;
