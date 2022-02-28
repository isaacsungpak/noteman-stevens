import styled from "styled-components";
import { useSelector } from "react-redux";

const Page = styled.div`
    height: 100vh;
    width: calc(100vw - 250px);
    background-color: #F4F2F7;
    display: flex;
    justify-content: center;
    align-items: center;
`

function HomePage() {
    const user = useSelector(state => state.session.user);

    return (
        <Page>
            <div>Welcome, {user.username}!</div>
        </Page>
    )
}

export default HomePage
