// import delete note modal
import { useEffect, useState } from "react";
import styled from "styled-components";
import DeleteNoteModal from "../Modals/DeleteNoteModal";
import exampleNote from "./ExampleNote";

const Tab = styled.div`
    width: 100%;
    height: 69px;
    border-bottom: 1px solid #BBB;
    background-color: ${props => props.isSelected ? '#D6CEDE' : '#F4F2F7'};
    box-shadow: ${props => props.isSelected ? 'inset 0 0 10px rgba(12, 9, 16, 0.3)' : 'none'};
    cursor: pointer;
    display: flex;

    div {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    #container {
        flex: 1;
        padding: 5px;
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    #title {
        font-size: 16px;
    }

    #content {
        font-size: 14px;
        color: ${props => props.isSelected ? '#555' : '#777'};
    }

    #date {
        font-size: 12px;
        color: ${props => props.isSelected ? '#777' : '#999'};
        text-align: right;
    }

    #delete {
        background-color: #453750;
        box-shadow: inset 0 0 8px rgba(12, 9, 16, 0.7);
        color: #f4f2f7;
        visibility: ${props => props.isHover ? 'visisble' : 'hidden'}
        transition: all 0.3s ease-in-out;
        width: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }

    #delete:hover {
        color: #B80046;
    }
`

function NoteTab({note, isSelected, setSelectedNote}) {
    const [isHover, setIsHover] = useState(false);
    const [noteTitle, setNoteTitle] = useState(note.title);
    const [noteContent, setNoteContent] = useState(note.content);

    const noteDate = new Date(note.updatedAt);
    const noteMonth = noteDate.getMonth() + 1;
    const noteDay = noteDate.getDate();
    const noteYear = noteDate.getFullYear();

    useEffect(() => {
        setNoteTitle(note.title);
        setNoteContent(note.content);
    }, [note.title, note.content])

    return (
        <>
            {
                note &&
                <Tab
                    isSelected={isSelected}
                    isHover={isHover}
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                    onClick={() => setSelectedNote(note)}
                >
                    <div id="container">
                        <div id="title">{noteTitle || <i>Untitled</i>}</div>
                        <div id="content">{noteContent || <i>No content</i>}</div>
                        <div id="date">{`Updated: ${noteMonth}/${noteDay}/${noteYear}`}</div>
                    </div>
                    { isHover &&
                        <DeleteNoteModal note={note} setIsHover={setIsHover}/>
                    }
                </Tab>
            }
        </>
    )
}

export default NoteTab;
