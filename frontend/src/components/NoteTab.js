// import delete note modal
import { useState } from "react";
import styled from "styled-components";

const exNote = {
    id: 1,
    userId: 1,
    title: "test note",
    content: "test content aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    notebookId: 1,
    createdAt: "2022-02-20 16:29:48.062738-05",
    updatedAt: "2022-02-20 16:29:48.062738-05"
}

const Tab = styled.div`
    width: 100%;
    height: 69px;
    border-bottom: 1px solid #BBB;
    background-color: ${props => props.isSelected ? '#D6CEDE' : '#F4F2F7'};
    box-shadow: ${props => props.isSelected ? 'inset 0 0 5px rgba(12, 9, 16, 0.5)' : 'none'};
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
        cursor: default;
    }
`

function NoteTab({note=exNote, isSelected}) {
    const [isHover, setIsHover] = useState(false);

    const noteDate = new Date(note.updatedAt);
    const noteMonth = noteDate.getMonth() + 1;
    const noteDay = noteDate.getDate();
    const noteYear = noteDate.getFullYear();

    return (
        <Tab
            isSelected={isSelected}
            isHover={isHover}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <div id="container">
                <div id="title">{note.title || <i>Untitled</i>}</div>
                <div id="content">{note.content || <i>No content</i>}</div>
                <div id="date">{`Updated: ${noteMonth}/${noteDay}/${noteYear}`}</div>
            </div>
            { isHover &&
                <div id="delete">
                    <i className="fas fa-trash"/>
                </div>
            }
        </Tab>
    )
}

export default NoteTab;
