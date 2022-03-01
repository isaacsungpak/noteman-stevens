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

export const updateTag = (tagId, title) => async (dispatch) => {
    const response = await csrfFetch(`/api/tags/${tagId}`, {
        method: 'PATCH',
        body: JSON.stringify({ title })
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(updateT(data.tag));
    }
    return response;
}

export const deleteTag = (tagId) => async (dispatch) => {
    const response = await csrfFetch(`/api/tags/${tagId}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(deleteT(data.tagId));
    }
    return response;
}

const tagReducer = (state = { tags: {} }, action) => {
    let newState;
    switch (action.type) {
        case SET_TAGS:
            // FOR SET TAG: PAYLOAD = ARRAY OF TAGS
            newState = {tags: {}}
            action.payload.forEach((tag) => {
                newState.tags[tag.id] = tag;
            })
            return newState;
        case UPDATE_TAG:
            // FOR UPDATE TAG: PAYLOAD = UPDATED TAG
            newState = {tags: {...state.tags}}
            let tag = action.payload;
            newState.tags[tag.id] = tag;
            return newState;
        case DELETE_TAG:
            // FOR DELETE TAG: PAYLOAD = DELETED TAGID
            newState = {tags: {...state.tags}}
            let tagId = action.payload;
            delete newState.tags[tagId];
            return newState;
        default:
            return state;
    }
};

export default tagReducer;
