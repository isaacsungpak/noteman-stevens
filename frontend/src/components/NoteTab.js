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
    width: calc(100% - 2px);
    height: 68px;
    border: 1px solid #CCC;
    border-top: 0;
    background-color: ${props => props.isSelected ? '#D6CEDE' : '#F4F2F7'};
    box-shadow: ${props => props.isSelected ? 'inset 0 0 5px rgba(12, 9, 16, 0.5)' : 'none'};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    div {
        width: 96%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
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
`

function NoteTab({note=exNote, isSelected}) {
    const noteDate = new Date(note.updatedAt);
    const noteMonth = noteDate.getMonth() + 1;
    const noteDay = noteDate.getDate();
    const noteYear = noteDate.getFullYear();

    return (
        <Tab isSelected={isSelected}>
            <div id="title">{note.title || <i>Untitled</i>}</div>
            <div id="content">{note.content || <i>No content</i>}</div>
            <div id="date">{`Updated: ${noteMonth}/${noteDay}/${noteYear}`}</div>
        </Tab>
    )
}

export default NoteTab;
