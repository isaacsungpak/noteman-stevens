import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as notebookActions from '../../store/notebooks';
import ActionsButton from './ActionsButton'
import './NotebooksPage.css';

function NotebooksPage() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const notebooks = useSelector((state) => state.notebook.notebooks);

    const [notebookName, setNotebookName] = useState('');

    useEffect(() => {
        dispatch(notebookActions.getNotebooks(user));
    }, [dispatch])

    let visibleNotebooks = notebooks;

    useEffect(() => {
        if (!notebookName.trim()) visibleNotebooks = notebooks;
        else visibleNotebooks = notebooks.filter(nb => nb.title.includes(notebookName.trim()));
    }, [notebookName])

    return (
        <>
            <div className='notebook-page-top-bar'>
                <p className='notebook-header'>Notebooks</p>
                <form>
                    <input onChange={(e) => setNotebookName(e.target.value)} value={notebookName} type='text' placeholder='Searchman' />
                </form>
            </div>

            <div className='notebook-page-grid-top'>
                <p className='notebook-count'>{`${visibleNotebooks.length ? visibleNotebooks.length : 0} notebooks`}</p>
                <button>
                    New Notebook
                </button>
            </div>

            <div className='notebook-page-grid'>
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Created By</th>
                            <th>Created On</th>
                            <th>Last Updated</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {visibleNotebooks.length > 0 && visibleNotebooks.map((nb, i) => (
                            <tr key={i}>
                                <td>{nb.title}</td>
                                <td>{nb.User.username}</td>
                                <td>{`${nb.createdAt.slice(5,7)}/${nb.createdAt.slice(8,10)}/${nb.createdAt.slice(0,4)}`}</td>
                                <td>{`${nb.createdAt.slice(5,7)}/${nb.createdAt.slice(8,10)}/${nb.createdAt.slice(0,4)}`}</td>
                                <td>
                                    <ActionsButton user={user} notebook={nb} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default NotebooksPage;
