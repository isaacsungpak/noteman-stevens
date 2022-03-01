import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { createNote } from "../../store/notes";

const Section = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: column;

    grid-column: 3/6;
    grid-row: 2;

    #select-bar {
        width: 100%;
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        select {
            width: calc(100% - 135px);
            height: 28px;
            background-color: #CCC;
            padding: 5px;
            border: 0;
            border-radius: 15px;
            outline: none;
            font-family: 'Montserrat', sans-serif;
        }

        button {
            font-size: 14px;
            font-family: 'Montserrat', sans-serif;
            border: 1px solid #0C0910;
            border-radius: 3px;
            background-color: #DED8E8;

            :not(:disabled):hover {
                background-color: #C8BFD9;
                cursor: pointer;
            }

            :disabled {
                background-color: #E9E5F0;
                border: 1px dashed rgba(12, 9, 16, 0.3);
            }
        }

        #success {
            color: #73648A;
        }
    }
`

const Pad = styled.div`
    flex: 1;
    width: calc(100% - 20px);
    background-color: #FEF5EB;
    border: 1px solid #FDE1C4;
    border-radius: 3px;
    box-shadow: 0 0 8px rgba(12, 9, 16, 0.2);
    padding: 10px;

    input, textarea {
        border: 0;
        border-radius: 0;
        outline: none;
        font-family: 'Montserrat', sans-serif;
        background-color: transparent;
        width: 100%;
        padding: 0;

        ::placeholder {
            color: #CCC;
        }
    }

    #title {
        font-size: 20px;
        border-bottom: 1px solid #BBB;
    }

    #content {
        font-size: 16px;
        width: 100%;
        height: calc(100% - 35px);
        margin-top: 10px;
        resize: none;
    }
`

function ScratchPad() {
    const dispatch = useDispatch();
    const notebooks = useSelector(state => state.notebooks.notebooks);

    const [noteTitle, setNoteTitle] = useState("");
    const [noteContent, setNoteContent] = useState("");
    const [selectedNotebookId, setSelectedNotebookId] = useState(0);
    const [saved, setSaved] = useState(false);

    const organizedNotebooks = Object.values(notebooks).sort((a, b) => a.title.localeCompare(b.title));

    const convertNote = () => {
        dispatch(createNote(noteTitle, noteContent, selectedNotebookId))
            .then(() => setSaved(true));
        setTimeout(() => setSaved(false), 2000);
    }

    return (
        <Section>
            <Pad>
                <input
                    type='text'
                    id='title'
                    placeholder="Scratch Pad"
                    value={noteTitle}
                    onChange={(e) => setNoteTitle(e.target.value)}
                />
                <textarea
                    id='content'
                    placeholder="Content"
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                />
            </Pad>
            <div id="select-bar">
                    <select
                        value={selectedNotebookId}
                        onChange={e => setSelectedNotebookId(e.target.value)}
                    >
                        <option
                            value={0}
                            disabled
                        >
                            Select a notebook
                        </option>
                        {
                            organizedNotebooks.map(notebook => (
                                <option value={notebook.id} key={`notebook${notebook.id}`}>
                                    {notebook.title}
                                </option>
                            ))
                        }
                    </select>
                    {
                        saved ?
                            <div id="success"><i className="fas fa-check-circle"/></div> :
                            <button onClick={convertNote} disabled={selectedNotebookId === 0 || (!noteTitle && !noteContent) }>Convert to Note</button>
                    }
                </div>
        </Section>
    )
}

export default ScratchPad;
