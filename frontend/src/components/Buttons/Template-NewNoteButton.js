import styled from "styled-components";

const Button = styled.div`
    height: 29px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #BBB;
    background-color: #F4F2F7;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    :hover {
        background-color: #FFEBF2;
    }
`

function NewNoteButton() {
    return (
        <Button>
            <i className="fas fa-plus"/>
        </Button>
    )
}

export default NewNoteButton;
