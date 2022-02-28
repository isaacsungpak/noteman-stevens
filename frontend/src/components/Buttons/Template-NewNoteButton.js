import styled from "styled-components";

const Button = styled.div`
    height: 29px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #BBB;
    color: #f4f2f7;
    background-color: #73648A;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    :hover {
        background-color: #453750;
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
