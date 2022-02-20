import { csrfFetch } from "./csrf";

const SET_NOTES = 'notes/SET_NOTES';
const UPDATE_NOTE = 'notes/UPDATE_NOTE';
const DELETE_NOTE = 'notes/DELETE_NOTE';

const SET_NOTETAGS = 'notes/SET_NOTES';
const UPDATE_NOTETAG = 'notes/UPDATE_NOTE';
const DELETE_NOTETAG = 'notes/DELETE_NOTE';

const setNs = (notes) => {
    return {
      type: SET_NOTES,
      payload: notes,
    };
};
const updateN = (note) => {
    return {
      type: UPDATE_NOTE,
      payload: note,
    };
};
const deleteN = (note) => {
    return {
      type: DELETE_NOTE,
      payload: note,
    };
};

const setNTs = (notetags) => {
    return {
      type: SET_NOTETAGS,
      payload: notetags,
    };
};
const updateNT = (notetag) => {
    return {
      type: UPDATE_NOTETAG,
      payload: notetag,
    };
};
const deleteNT = (notetag) => {
    return {
      type: DELETE_NOTETAG,
      payload: notetag,
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
    dispatch(updateN(data.note));
    return response;
}

export const getAllNotes = () => async (dispatch) => {
    const response = await csrfFetch(`/api/notes/`);
    const data = await response.json();
    dispatch(setNs(data.notes));
    return response;
}

export const getNotesFromNotebook = (notebookId) => async (dispatch) => {
    const response = await csrfFetch(`/api/notebooks/${notebookId}`);
    const data = await response.json();
    dispatch(setNs(data.notes));
    return response;
}

export const updateNote = (title, content, noteId) => async (dispatch) => {
    const response = await csrfFetch(`/api/notes/${noteId}`, {
        method: 'PATCH',
        body: JSON.stringify({
            title, content
        })
    });
    const data = await response.json();
    dispatch(updateN(data.note));
    return response;
}

export const deleteNote = (noteId) => async (dispatch) => {
    const response = await csrfFetch(`/api/notes/${noteId}`, {
        method: 'DELETE',
    });
    const data = await response.json();
    dispatch(deleteN(data.note));
    return response;
}

///////////////////////////////////////////////////////////////////////////////////////////

export const createNoteFromNotebook = (title, content, notebookId) => async (dispatch) => {
    const response = await csrfFetch(`/api/notebooks/${notebookId}`, {
        method: 'POST',
        body: JSON.stringify({
            title, content
        })
    });
    const data = await response.json();
    dispatch(setNs(data.notes));
    return response;
}

export const updateNoteFromNotebook = (title, content, noteId, notebookId) => async (dispatch) => {
    const response = await csrfFetch(`/api/notenooks/${notebookId}/notes/${noteId}`, {
        method: 'PATCH',
        body: JSON.stringify({
            title, content
        })
    });
    return response;
}

export const deleteNoteFromNotebook = (noteId, notebookId) => async (dispatch) => {
    const response = await csrfFetch(`/api/notebooks/${notebookId}/notes/${noteId}`, {
        method: 'DELETE',
    });
    const data = await response.json();
    dispatch(deleteN(data.notes));
    return response;
}

const noteReducer = (state = { notes: {}, noteTagRelations: {} }, action) => {
    let newState;
    let noteTag;
    switch (action.type) {
        case SET_NOTES:
            // FOR SET NOTEBOOK: PAYLOAD = ARRAY OF NOTEBOOKS
            newState = Object.assign({}, state);
            action.payload.notes.forEach(note => {
                newState.notes[note.id] = note;
            })
            return newState;
        case UPDATE_NOTE:
            // FOR UPDATE NOTEBOOK: PAYLOAD = UPDATED NOTEID
            newState = Object.assign({}, state);
            let note = action.payload;
            newState.notes[note.id] = note;
            return newState;
        case DELETE_NOTE:
            // FOR DELETE NOTEBOOK: PAYLOAD = DELETED NOTEID
            newState = Object.assign({}, state);
            let noteId = action.payload;
            delete newState.notes[noteId];
            return newState;

        case SET_NOTETAGS:
            // FOR SET NOTETAG: PAYLOAD = ARRAY OF NOTETAGS
            newState = Object.assign({}, state);
            action.payload.noteTags.forEach(notetag => {
                if (!newState.noteTagRelations[notetag.noteId]) newState.noteTagRelations[notetag.noteId] = {};
                newState.noteTagRelations[notetag.noteId][notetag.tagId] = notetag;
            })
            return newState;
        case UPDATE_NOTETAG:
            // FOR UPDATE NOTETAG: PAYLOAD = UPDATED NOTETAG
            newState = Object.assign({}, state);
            noteTag = action.payload;
            if (!newState.noteTagRelations[noteTag.noteId]) newState.noteTagRelations[noteTag.noteId] = {};
            newState.noteTagRelations[noteTag.noteId][noteTag.tagId] = noteTag;
            return newState;
        case DELETE_NOTETAG:
            // FOR DELETE NOTETAG: PAYLOAD = OBJ W NOTEID AND TAGID
            newState = Object.assign({}, state);
            noteTag = action.payload;
            delete newState.noteTagRelations[noteTag.noteId][noteTag.tagId];
            return newState;

        default:
            return state;
    }
};

export default noteReducer;
