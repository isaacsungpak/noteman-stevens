import { deleteTag } from "../../store/tags";
import ModalFormContainer from "./ModalFormContainer";
import { useDispatch } from "react-redux";


function DeleteTagForm({ tag, selectedTagId, setSelectedTagId, setShowModal }) {
    const dispatch = useDispatch();
    const tagId = tag.id;

    const delTag = () => {
        dispatch(deleteTag(tagId))
            .then(() => setShowModal(false))
            .then(() => {
                if (selectedTagId === tagId) setSelectedTagId(0);
            })
    }

    const cancel = () => {
        setShowModal(false);
    }

    return (
        <ModalFormContainer>
            <div id="title">Delete Tag</div>
            <div id="instructions">
                Are you sure that you want to delete
                <br />
                "<div id="instruction-title">{tag.title}</div>"
            </div>
            <div id="button-holder">
                <button onClick={delTag}>Yes</button>
                <button onClick={cancel}>No</button>
            </div>
        </ModalFormContainer>
    )
}

export default DeleteTagForm;
