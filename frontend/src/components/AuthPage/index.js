import LogInForm from "../Forms/LogInForm";
import SignUpForm from "../Forms/SignUpForm";
import styled from "styled-components";

const Page = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-y: auto;
    overflow-x: hidden;

    #horiz {
        height: 0;
        width 0;
        margin: 0;
        border-bottom: none;
        visibility: hidden;
    }

    #vert {
        height 100vh;
        width 1px;
        margin: 0 20px;
        border-right: 1px solid rgba(12, 9, 16, 0.3);
        visibility: visible;
    }

    @media (max-width: 1000px) {
        flex-direction: column-reverse;

        #horiz {
            height: 1px;
            width: 100vw;
            margin: 60px 0;
            border-bottom: 1px solid rgba(12, 9, 16, 0.3);
            visibility: visible;
        }

        #vert {
            height 0;
            width 0;
            margin: 0;
            border-right: none;
            visibility: hidden;
        }

    }
`

function AuthPage() {
    return(
        <Page>
            <SignUpForm />
            <div id="horiz"/>
            <div id="vert"/>
            <LogInForm />
        </Page>
    )
}

export default AuthPage;
