import styled from "styled-components";

const Tab = styled.div`
    width: 100%;
    height: calc(100vh - 30px);
    display: flex;
    justify-content: center;
    align-items: center;
    color: #73648a;
`

function NoNotesMessage() {
    return (
        <Tab>
            <div>No notes to see here...</div>
        </Tab>
    )
}

export default NoNotesMessage;
