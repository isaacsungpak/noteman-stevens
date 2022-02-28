import { deleteNote } from "../../store/notes";
import ModalFormContainer from "./ModalFormContainer";
import { useDispatch } from "react-redux";
import exampleNote from "../NoteComponents/ExampleNote";

function DeleteNoteForm({ note, setIsHover, setShowModal, selectedNoteId, setSelectedNote }) {
    const dispatch = useDispatch();

    // note: assigning here in case id variable gets lost is deletion bc note is defined by
    const noteId = note.id;
    const snid = selectedNoteId;

    const delNote = () => {
        dispatch(deleteNote(note.id))
            .then(() => setShowModal(false))
            .then(() => setIsHover(false))
            .then(() => {
                if (noteId === snid) setSelectedNote(exampleNote);
            })
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
                "<div id="instruction-title">{note.title || <i>Untitled</i>}</div>"
            </div>
            <div id="button-holder">
                <button onClick={delNote}>Yes</button>
                <button onClick={cancel}>No</button>
            </div>
        </ModalFormContainer>
    )
}

export default DeleteNoteForm;
