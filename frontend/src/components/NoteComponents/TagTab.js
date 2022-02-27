import { useSelector } from "react-redux";
import styled from "styled-components";
import { deleteNoteTag } from "../../store/notes";
import { useDispatch } from "react-redux";

const Tab = styled.div`
    width: fit-content;
    max-width: 236px;
    height: 18px;
    padding: 5px 7px;
    border-radius: 15px;
    font-size: 14px;
    color: #F4F2F7;
    background-color: #888;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    &:hover {
        background-color: #660027;
        cursor: pointer;
    }
`

function TagTab({noteId, tagId}) {
    const dispatch = useDispatch();
    const tags = useSelector(state => state.tags.tags);
    const noteTags = useSelector(state => state.notes.noteTagRelations);

    const removeTag = () => {
        dispatch(deleteNoteTag(noteId, tagId));
    }

    return (
        <>
            {
                (noteTags[noteId] && noteTags[noteId][tagId]) &&
                <Tab onClick={removeTag}>{tags[tagId].title}</Tab>
            }
        </>
    )
}

export default TagTab;
