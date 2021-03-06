import styled from "styled-components";

const Bar = styled.div`
    width: 319px;
    height: 100vh;
    background-color: #DFD9ED;
    box-shadow: inset 0 0 10px rgba(12, 9, 16, 0.3);
    box-shadow: 0 0 8px rgba(69, 55, 80, 0.2);
    border-right: 1px solid #d5d0dd;
    position: absolute;
    left: 0px;
    overflow-y: auto;
    z-index: 500;
`

function NoteBar({children, addNote=false}) {
    return  (
        <Bar addNote={addNote}>
            { children }
        </Bar>
    )
}

export default NoteBar;
