import { csrfFetch } from "./csrf";

const SET_NOTEBOOKS = 'notebooks/SET_NOTEBOOKS';
const DELETE_NOTEBOOK = 'notebooks/DELETE_NOTEBOOK';

const setNotebooks = (notebooks) => {
    return {
      type: SET_NOTEBOOKS,
      payload: notebooks,
    };
};

// const deleteNotebook = (notebook) => {
//     return {
//       type: DELETE_NOTEBOOK,
//       payload: notebook,
//     };
// };

export const createNotebook = (user, title) => async (dispatch) => {
    const userId = user.id;

    const response = await csrfFetch(`/api/notebooks/`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            userId
        })
    });
    const data = await response.json();
    dispatch(setNotebooks(data.notebooks));
    return response;
}

export const getNotebooks = (user) => async (dispatch) => {
    const userId = user.id;

    const response = await csrfFetch(`/api/notebooks/users/${userId}`);
    const data = await response.json();
    dispatch(setNotebooks(data.notebooks));
    return response;
}

export const updateNotebook = (user, title) => async (dispatch) => {
    const userId = user.id;

    const response = await csrfFetch(`/api/notebooks/`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            userId
        })
    });
    const data = await response.json();
    dispatch(setNotebooks(data.notebooks));
    return response;
}

export const deleteNotebook = (user, notebook) => async (dispatch) => {
    const userId = user.id;
    const notebookId = notebook.id;

    const response = await csrfFetch(`/api/notebooks/${notebookId}`, {
        method: 'DELETE',
        body: JSON.stringify({
            userId
        })
    });
    const data = await response.json();
    dispatch(setNotebooks(data.notebooks));
    return response;
}

const notebookReducer = (state = { notebooks: [] }, action) => {
    let newState;
    switch (action.type) {
        case SET_NOTEBOOKS:
            newState = Object.assign({}, state);
            newState.notebooks = action.payload;
            return newState;
        default:
            return state;
    }
};

export default notebookReducer;
