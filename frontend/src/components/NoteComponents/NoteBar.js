import styled from "styled-components";

const Bar = styled.div`
    width: 319px;
    height: 100%;
    background-color: #D5D0DD;
    box-shadow: inset 0 0 10px rgba(12, 9, 16, 0.3);
    border-right: 1px solid #d5d0dd;
    position: absolute;
    left: 0px;
    overflow-y: auto;
    box-shadow: 0 0 8px rgba(69, 55, 80, 0.2);
    z-index: 500;
`

function NoteBar({children, newNote}) {
    return  (
        <Bar>
            { children }
        </Bar>
    )
}

export default NoteBar;
