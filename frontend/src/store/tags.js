import { csrfFetch } from "./csrf";

const SET_TAGS = 'tags/SET_TAGS';
const DELETE_TAG = 'tags/DELETE_TAG';
const UPDATE_TAG = 'tags/UPDATE_TAG';

const setTs = (tags) => {
    return {
      type: SET_TAGS,
      payload: tags,
    };
};
const updateT = (tag) => {
    return {
        type: UPDATE_TAG,
        payload: tag,
    };
};
const deleteT = (tagId) => {
    return {
      type: DELETE_TAG,
      payload: tagId,
    };
};

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

export const createTag = (title) => async (dispatch) => {
    const response = await csrfFetch(`/api/tags`, {
        method: 'POST',
        body: JSON.stringify({ title })
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(updateT(data.tag));
    }
    return response;
}

export const getTags = () => async (dispatch) => {
    const response = await csrfFetch(`/api/tags`);
    if (response.ok) {
        const data = await response.json();
        await dispatch(setTs(data.tags));
    }
    return response;
}

export const updateTag = (notebookId, title) => async (dispatch) => {
    const response = await csrfFetch(`/api/notebooks/${notebookId}`, {
        method: 'PATCH',
        body: JSON.stringify({ title })
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(updateT(data.tag));
    }
    return response;
}

export const deleteTag = (notebookId) => async (dispatch) => {
    const response = await csrfFetch(`/api/notebooks/${notebookId}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(deleteT(data.tag));
    }
    return response;
}

const tagReducer = (state = { tags: {} }, action) => {
    let newState;
    switch (action.type) {
        case SET_TAGS:
            // FOR SET TAG: PAYLOAD = ARRAY OF TAGS
            newState = Object.assign({}, state);
            action.payload.forEach((tag) => {
                newState.tags[tag.id] = tag;
            })
            return newState;
        case UPDATE_TAG:
            // FOR UPDATE TAG: PAYLOAD = UPDATED TAG
            newState = Object.assign({}, state);
            let tag = action.payload;
            newState.tags[tag.id] = tag;
            return newState;
        case DELETE_TAG:
            // FOR DELETE TAG: PAYLOAD = DELETED TAGID
            newState = Object.assign({}, state);
            let tagId = action.payload;
            delete newState.tags[tagId];
            return newState;
        default:
            return state;
    }
};

export default tagReducer;
