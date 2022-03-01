import styled from "styled-components";
import { useSelector } from "react-redux";
import ScratchPad from "./ScratchPad";
import QuickLinks from "./QuickLinks";

const Page = styled.div`
    height: calc(100vh - 50px);
    width: calc(100vw - 290px);
    background-color: #F4F2F7;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: 40px 1fr;
    gap: 20px;
    padding: 20px;
    padding-bottom: 30px;

    #welcome {
        height: fit-content;
        font-size: 30px;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        grid-column: 1/6;
        grid-row: 1;
    }
`

function HomePage() {
    const user = useSelector(state => state.session.user);

    return (
        <Page>
            <div id="welcome">
                <div>Welcome, {user.username}!</div>
            </div>
            <QuickLinks />
            <ScratchPad />
        </Page>
    )
}

export default HomePage
