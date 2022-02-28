import { deleteNotebook } from "../../store/notebooks";
import ModalFormContainer from "./ModalFormContainer";
import { useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";


function DeleteNotebookForm({ notebook, setShowModal }) {
    const dispatch = useDispatch();
    const location = useLocation();
    const currentPath = location.pathname;
    const history = useHistory();
    const notebookId = notebook.id;

    const delNotebook = () => {
        dispatch(deleteNotebook(notebook.id))
            .then(() => {
                setShowModal(false);
                if (currentPath === `/notebooks/${notebookId}`) history.push('/')
            });
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
