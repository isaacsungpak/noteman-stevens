import styled from "styled-components";
import { useSelector } from "react-redux";
import ScratchPad from "./ScratchPad";
import QuickLinks from "./QuickLinks";

const Page = styled.div`
    height: 100vh;
    width: calc(100vw - 250px);
    background-color: #F4F2F7;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    #welcome {
        height: calc(10vh - 20px);
        width: calc(100% - 20px);
        padding: 10px;
        font-size: 30px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    #body {
        display: flex;
        justify-content: center;
        align-items: start;
    }
`

function HomePage() {
    const user = useSelector(state => state.session.user);

    return (
        <Page>
            <div id="welcome">
                <div>Welcome, {user.username}!</div>
            </div>
            <div id="body">
                <QuickLinks />
                <ScratchPad />
            </div>
        </Page>
    )
}

export default HomePage
