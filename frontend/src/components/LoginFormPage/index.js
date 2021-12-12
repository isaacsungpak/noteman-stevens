import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';

function LoginFormPage() {
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
        <>
            <br />
            <p className='signup-login-title'>Log In</p>
            <form onSubmit={handleSubmit}>
                <ul className="val-errors">
                    {errors.map((err, i) => <li key={i}>{err}</li>)}
                </ul>
                <input onChange={(e) => setCredential(e.target.value)} type="text" value={credential} required placeholder='Username/Email'/>

                <br />
                <br />

                <input onChange={(e) => setPassword(e.target.value)} type="password" value={password} required placeholder='Password'/>

                <br />
                <br />

                <div id='login-button-holder'>
                    <button type="submit">Log In</button>
                    <button onClick={demoUser}>Demo User</button>
                </div>
            </form>
            <br />
        </>
    )
}

export default LoginFormPage;
