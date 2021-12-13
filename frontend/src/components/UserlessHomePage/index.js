import LoginFormPage from "../LoginFormPage";
import SignupFormPage from "../SignupFormPage";
import './UserlessHomePage.css'

function UserlessHomePage() {
    return (
        <div id='signup-and-login-holder'>
            <div id='signup-holder'>
                <SignupFormPage />
            </div>
            <div id='login-holder'>
                <LoginFormPage />
            </div>
        </div>
    )
}

export default UserlessHomePage;
