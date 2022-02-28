import styled from "styled-components"

const Container = styled.div`
    min-width: 400px;
    width: fit-content;
    max-width: 600px;
    height: fit-content;
    max-height: 400px;
    padding: 20px;
    color: #0C0910;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    #title {
        font-size: 30px;
        margin-bottom: 30px;
        color: #A393BF;
    }

    #instructions {
        font-size: 16px;
        text-align: center;
    }
    #instruction-title {
        font-size: 16px;
        display: inline;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .bad {
        color: #B80046;
    }

    form {
        padding: 0;
        margin: 0;
        width: 100%;
        height: fit-content;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    input {
        outline: none;
        border: 0;
        font-size: 16px;
        font-family: 'Montserrat', sans-serif;
        border-bottom: 1px solid rgba(12, 9, 16, 0.3);
        width: 100%;
        margin-bottom: 30px;
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

    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }
`

function AuthFormContainer({children}) {
    return (
        <Container>
            {children}
        </Container>
    )
}
export default AuthFormContainer
