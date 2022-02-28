import styled from "styled-components"

const Container = styled.div`
    min-width: 400px;
    width: fit-content;
    max-width: 600px;
    height: fit-content;
    max-height: 400px;
    padding: 20px;
    color: #0C0910;
    background-color: #F4F2F7;
    border: 1px solid #44001A;
    border-radius: 3px;
    filter: drop-shadow(2px 4px 5px rgba(12, 9, 16, 0.5));
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    #title {
        font-size: 20px;
        font-weight: 700;
        margin-bottom: 10px;
    }

    #instructions {
        font-size: 16px;
        text-align: center;
        margin-bottom: 10px;
    }

    #instruction-title {
        font-size: 16px;
        display: inline;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .bad {
        color: #660027;
    }

    form {
        padding: 0;
        margin: 0;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    input {
        outline: none;
        border: 0;
        background-color: #F4F2F7;
        font-size: 16px;
        font-family: 'Montserrat', sans-serif;
        border-bottom: 1px solid rgba(12, 9, 16, 0.5);
        width: 100%;
        margin-bottom: 10px;
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

    #button-holder {
        margin-top: 10px;
        width: 100%;
        display: flex;
        flex-direction: row-reverse;
        justify-content: space-between;
        align-items: center;
    }

    select {
        margin-top: 10px;
        width: 300px;
        height: 28px;
        background-color: #CCC;
        padding: 5px;
        border: 0;
        border-radius: 15px;
        outline: none;
        font-family: 'Montserrat', sans-serif;
    }
`

function ModalFormContainer({children}) {
    return (
        <Container>
            {children}
        </Container>
    )
}
export default ModalFormContainer
