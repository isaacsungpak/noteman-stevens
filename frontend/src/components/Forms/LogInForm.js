import AuthFormContainer from "./AuthFormContainer";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

function LogInForm() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
          .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
          });
    }

    const demoUser = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential: 'demo-user', password: 'password' }))
          .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
          });
    }

    return (
        <AuthFormContainer>
            <div id='title'>Log In</div>
            <form onSubmit={handleSubmit}>
                <ul className="bad">
                    {errors.map((err, i) => <li key={i}>{err}</li>)}
                </ul>
                <input onChange={(e) => setCredential(e.target.value)} type="text" value={credential} required placeholder='Username/Email'/>
                <input onChange={(e) => setPassword(e.target.value)} type="password" value={password} required placeholder='Password'/>

                <div id='button-holder'>
                    <button type="submit">Log In</button>
                    <button onClick={demoUser}>Demo User</button>
                </div>
            </form>
        </AuthFormContainer>
    )
}

export default LogInForm;
