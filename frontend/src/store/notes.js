import { csrfFetch } from "./csrf";

const SET_NOTES = 'notes/SET_NOTES';

const setNotes = (notes) => {
    return {
      type: SET_NOTES,
      payload: notes,
    };
};

export const createNote = (title, content, notebookId) => async (dispatch) => {
    const response = await csrfFetch(`/api/notes/`, {
        method: 'POST',
        body: JSON.stringify({
            title, content, notebookId
        })
    });
    const data = await response.json();
    dispatch(setNotes(data.notes));
    return response;
}

export const createNoteFromNotebook = (title, content, notebookId) => async (dispatch) => {
    const response = await csrfFetch(`/api/notebooks/${notebookId}`, {
        method: 'POST',
        body: JSON.stringify({
            title, content
        })
    });
    const data = await response.json();
    dispatch(setNotes(data.notes));
    return response;
}

export const getAllNotes = () => async (dispatch) => {
    const response = await csrfFetch(`/api/notes/`);
    const data = await response.json();
    dispatch(setNotes(data.notes));
    return response;
}

export const getNotesFromNotebook = (notebookId) => async (dispatch) => {
    const response = await csrfFetch(`/api/notebooks/${notebookId}/notes`);
    const data = await response.json();
    dispatch(setNotes(data.notes));
    return response;
}

export const updateNote = (title, content, noteId) => async (dispatch) => {
    const response = await csrfFetch(`/api/notes/${noteId}`, {
        method: 'PATCH',
        body: JSON.stringify({
            title, content
        })
    });
    // const data = await response.json();
    // dispatch(setNotes(data.notes));
    return;
}

export const updateNoteFromNotebook = (title, content, noteId, notebookId) => async (dispatch) => {
    const response = await csrfFetch(`/api/notenooks/${notebookId}/notes/${noteId}`, {
        method: 'PATCH',
        body: JSON.stringify({
            title, content
        })
    });
    // const data = await response.json();
    // dispatch(setNotes(data.notes));
    return;
}

export const deleteNote = (noteId) => async (dispatch) => {
    const response = await csrfFetch(`/api/notes/${noteId}`, {
        method: 'DELETE',
    });
    const data = await response.json();
    dispatch(setNotes(data.notes));
    return response;
}

export const deleteNoteFromNotebook = (noteId, notebookId) => async (dispatch) => {
    const response = await csrfFetch(`/api/notebooks/${notebookId}/notes/${noteId}`, {
        method: 'DELETE',
    });
    const data = await response.json();
    dispatch(setNotes(data.notes));
    return response;
}

const noteReducer = (state = { notes: [] }, action) => {
    let newState;
    switch (action.type) {
        case SET_NOTES:
            newState = Object.assign({}, state);
            newState.notes = action.payload;
            return newState;
        default:
            return state;
    }
};

export default noteReducer;
