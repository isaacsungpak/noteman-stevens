import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as notebookActions from '../../store/notebooks';
import ActionsButton from './ActionsButton'
import CreateModal from './CreateModal';

function NotebooksPage() {
    const dispatch = useDispatch();
    const notebooks = useSelector((state) => state.notebook.notebooks);
    const user = useSelector((state) => state.session?.user);

    const [showCreateModal, setShowCreateModal] = useState('');
    const [notebookSearch, setNotebookSearch] = useState('');
    const [visibleNotebooks, setVisibleNotebooks] = useState([]);

    useEffect(() => {
        dispatch(notebookActions.getNotebooks());
    }, [dispatch])

    useEffect(() => {
        setVisibleNotebooks(
            notebooks.filter(nb => nb.title.toLowerCase().includes(notebookSearch.toLowerCase()))
                .sort((a,b) => (
                b.updatedAt.slice(0,4) - a.updatedAt.slice(0,4) ||
                b.updatedAt.slice(5,7) - a.updatedAt.slice(5,7) ||
                b.updatedAt.slice(8,10) - a.updatedAt.slice(8,10) ||
                b.updatedAt.slice(11,13) - a.updatedAt.slice(11,13) ||
                b.updatedAt.slice(14,16) - a.updatedAt.slice(14,16) ||
                b.updatedAt.slice(17,19) - a.updatedAt.slice(17,19)))
        );
    }, [dispatch, notebookSearch, notebooks])

    return (
        <>
            {!user && <Redirect to="/" />}
            <div id='notebook-page-top-bar'>
                <div id='notebook-header'>Notebooks</div>
                <form>
                    <input onChange={(e) => setNotebookSearch(e.target.value)} value={notebookSearch} type='text' placeholder='Searchman' />
                </form>
            </div>

            <div className='note-grid-top'>
                <p id='notebook-count'>{`${visibleNotebooks.length ? visibleNotebooks.length : 0} notebooks`}</p>
                <button className="new-note-btn" onClick={() => setShowCreateModal(true)}>
                    <i className="fas fa-plus"></i>
                </button>
                {showCreateModal && <CreateModal notebooks={notebooks} setShowCreateModal={setShowCreateModal}/>}
            </div>

            <div className='note-grid'>
                <table>
                    <thead>
                        <tr className="odd-row">
                            <th className="note-title">TITLE</th>
                            <th className="note-author">CREATED BY</th>
                            <th className="note-created">CREATED ON</th>
                            <th className="note-updated">UPDATED</th>
                            <th className="note-actions">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {visibleNotebooks.length > 0 && visibleNotebooks.map((nb, i) =>
                                <tr key={i} className={i % 2 === 0 ? "even-row" : "odd-row"}>
                                    <td className="note-title">
                                        <Link className="note-link" to={`/notebooks/${nb.id}`}>{nb.title}</Link>
                                    </td>
                                    <td className="note-author">{nb.User.username}</td>
                                    <td className="note-created">{`${nb.createdAt.slice(5,7)}/${nb.createdAt.slice(8,10)}/${nb.createdAt.slice(0,4)}`}</td>
                                    <td className="note-updated">{`${nb.updatedAt.slice(5,7)}/${nb.updatedAt.slice(8,10)}/${nb.updatedAt.slice(0,4)}`}</td>
                                    <td className="note-actions">
                                        <ActionsButton notebook={nb}/>
                                    </td>
                                </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default NotebooksPage;