import { deleteNote } from "../../store/notes";
import ModalFormContainer from "./ModalFormContainer";
import { useDispatch } from "react-redux";


function DeleteNoteForm({ note, setIsHover, setShowModal }) {
    const dispatch = useDispatch();
    const delNote = () => {
        dispatch(deleteNote(note.id))
            .then(() => setShowModal(false))
            .then(() => setIsHover(false))
    }

    const cancel = () => {
        setShowModal(false);
        setIsHover(false);
    }

    return (
        <ModalFormContainer>
            <div id="title">Delete Note</div>
            <div id="instructions">
                Are you sure that you want to delete
                <br />
                "<div id="instruction-title">{note.title || <i>"Untitled"</i>}</div>"
            </div>
            <div id="button-holder">
                <button onClick={delNote}>Yes</button>
                <button onClick={cancel}>No</button>
            </div>
        </ModalFormContainer>
    )
}

export default DeleteNoteForm;
