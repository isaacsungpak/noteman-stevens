import { csrfFetch } from "./csrf";

const SET_NOTEBOOKS = 'notebooks/SET_NOTEBOOKS';
const DELETE_NOTEBOOK = 'notebooks/DELETE_NOTEBOOK';
const UPDATE_NOTEBOOK = 'notebooks/UPDATE_NOTEBOOK';

const setNBs = (notebooks) => {
    return {
      type: SET_NOTEBOOKS,
      payload: notebooks,
    };
};
const updateNB = (notebook) => {
    return {
        type: UPDATE_NOTEBOOK,
        payload: notebook,
    };
};
const deleteNB = (notebookId) => {
    return {
      type: DELETE_NOTEBOOK,
      payload: notebookId,
    };
};

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

export const createNotebook = (title) => async (dispatch) => {
    const response = await csrfFetch(`/api/notebooks`, {
        method: 'POST',
        body: JSON.stringify({
            title
        })
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(updateNB(data.notebook));
    }
    return response;
}

export const getNotebooks = () => async (dispatch) => {
    const response = await csrfFetch(`/api/notebooks`);
    if (response.ok) {
        const data = await response.json();
        await dispatch(setNBs(data.notebooks));
    }
    return response;
}

export const updateNotebook = (notebookId, title) => async (dispatch) => {
    const response = await csrfFetch(`/api/notebooks/${notebookId}`, {
        method: 'PATCH',
        body: JSON.stringify({
            title
        })
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(updateNB(data.notebook));
    }
    return response;
}

export const deleteNotebook = (notebookId) => async (dispatch) => {
    const response = await csrfFetch(`/api/notebooks/${notebookId}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(deleteNB(data.notebookId));
    }
    return response;
}

const notebookReducer = (state = { notebooks: {} }, action) => {
    let newState;
    switch (action.type) {
        case SET_NOTEBOOKS:
            // FOR SET NOTEBOOK: PAYLOAD = ARRAY OF NOTEBOOKS
            newState = {...state, notebooks: {...state.notebooks}};
            action.payload.forEach((notebook) => {
                newState.notebooks[notebook.id] = notebook;
            })
            return newState;
        case UPDATE_NOTEBOOK:
            // FOR UPDATE NOTEBOOK: PAYLOAD = UPDATED NOTEBOOKID
            newState = {...state, notebooks: {...state.notebooks}};
            let notebook = action.payload;
            newState.notebooks[notebook.id] = notebook;
            return newState;
        case DELETE_NOTEBOOK:
            // FOR DELETE NOTEBOOK: PAYLOAD = DELETED NOTEBOOKID
            newState = {...state, notebooks: {...state.notebooks}};
            let notebookId = action.payload;
            delete newState.notebooks[notebookId];
            return newState;
        default:
            return state;
    }
};

export default notebookReducer;
