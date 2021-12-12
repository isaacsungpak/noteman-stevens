import { csrfFetch } from "./csrf";

const SET_NOTEBOOKS = 'notebooks/SET_NOTEBOOKS';

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

export const createNotebook = (title) => async (dispatch) => {
    const response = await csrfFetch(`/api/notebooks`, {
        method: 'POST',
        body: JSON.stringify({
            title
        })
    });
    const data = await response.json();
    dispatch(setNotebooks(data.notebooks));
    return response;
}

export const getNotebooks = () => async (dispatch) => {
    const response = await csrfFetch(`/api/notebooks`);
    const data = await response.json();
    await dispatch(setNotebooks(data.notebooks));
    return response;
}

export const getSingleNotebookTitle = (notebookId) => async (dispatch) => {
    const response = await csrfFetch(`/api/notebooks/${notebookId}/title`);
    const data = await response.json();
    return {response, title: data.title};
}

export const updateNotebook = (notebookId, title) => async (dispatch) => {
    const response = await csrfFetch(`/api/notebooks/${notebookId}`, {
        method: 'PATCH',
        body: JSON.stringify({
            title
        })
    });
    const data = await response.json();
    dispatch(setNotebooks(data.notebooks));
    return response;
}

export const deleteNotebook = (notebookId) => async (dispatch) => {
    const response = await csrfFetch(`/api/notebooks/${notebookId}`, {
        method: 'DELETE',
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
