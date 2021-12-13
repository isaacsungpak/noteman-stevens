import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as notebookActions from '../../store/notebooks';
import * as noteActions from '../../store/notes';
import { Link } from "react-router-dom";

function LoggedInHomePage({ sessionUser }) {
    const dispatch = useDispatch();
    const notebooks = useSelector((state) => state.notebook.notebooks);
    const notes = useSelector((state) => state.note.notes);
    const [numNotebooks, setNumNotebooks] = useState(0);
    const [numNotes, setNumNotes] = useState(0);

    const [mostPopularNotebook, setMostPopularNotebook] = useState('');
    const [notesInPopularNotebook, setNotesInPopularNotebook] = useState('');

    const [padContent, setPadContent] = useState('');

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
            <div id='stats-holder'>
                <p id='welcome-user'>Hey, {sessionUser.username}!</p>
                <p className='stat-line'>Number of Notebooks: {numNotebooks}</p>
                <p className='stat-line'>Number of Notes: {numNotes}</p>
                <p className='stat-line'>Average Notes per Notebook: {(numNotes / (numNotebooks || 1)).toFixed(2)}</p>

                <br />
                <p className='stat-line'>Most Popular Notebook: {mostPopularNotebook === '' ? <i>N/A</i> : <b><Link to={`notebooks/${mostPopularNotebook.className}`}>{mostPopularNotebook.title}</Link></b>}</p>
                {mostPopularNotebook !== '' && <p className='stat-line detail'><i>({notesInPopularNotebook} notes)</i></p>}
                <br />

            </div>

            <div id="scratchpad-container">
                <p id='scratch-pad-title'>Scratch Pad</p>
                <textarea onChange={(e) => setPadContent(e.target.value)} value={padContent} placeholder="Note content" className='note-page-content-input'></textarea>
                <button>Save</button>
            </div>
        </div>
    )
}

export default LoggedInHomePage;
