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

    const [notebookName, setNotebookName] = useState();

    useEffect(() => {
        dispatch(notebookActions.getNotebooks(user));
    }, [dispatch])
    console.log(notebooks);

    return (
        <>
            <div className='notebook-page-top-bar'>
                <p className='notebook-header'>Notebooks</p>
                <input type='text' placeholder='Searchman' />
            </div>

            <div className='notebook-page-grid-top'>
                <p className='notebook-count'>{`${notebooks.length} notebooks`}</p>
                <button>
                    <i className="far fa-user-circle" />
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
                        {notebooks.map((nb, i) => (
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
