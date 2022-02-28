import LogInForm from "../Forms/LogInForm";
import LoginFormPage from "../LoginFormPage";
import SignupFormPage from "../SignupFormPage";
import SignUpForm from "../Forms/SignUpForm";

function UserlessHomePage() {
    return (
        <div id='signup-and-login-holder'>
            <SignUpForm />
            <LogInForm />
        </div>
    )
}

export default UserlessHomePage;
