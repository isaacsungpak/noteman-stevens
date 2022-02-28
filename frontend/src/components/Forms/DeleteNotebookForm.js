import { deleteNotebook } from "../../store/notebooks";
import ModalFormContainer from "./ModalFormContainer";
import { useDispatch } from "react-redux";


function DeleteNotebookForm({ notebook, setShowModal }) {
    const dispatch = useDispatch();
    const delNotebook = () => {
        dispatch(deleteNotebook(notebook.id))
            .then(() => setShowModal(false))
    }

    const cancel = () => {
        setShowModal(false);
    }

    return (
        <ModalFormContainer>
            <div id="title">Delete Notebook</div>
            <div id="instructions">
                Are you sure that you want to delete
                <br />
                "<div id="instruction-title">{notebook.title}</div>""
            </div>
            <div id="button-holder">
                <button onClick={delNotebook}>Yes</button>
                <button onClick={cancel}>No</button>
            </div>
        </ModalFormContainer>
    )
}

export default DeleteNotebookForm;
