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
        <form onSubmit={handleSubmit}>
            <ul>
                {errors.map((err, i) => <li key={i}>{err}</li>)}
            </ul>
            <label>
                Username or Email
                <input onChange={(e) => setCredential(e.target.value)} type="text" value={credential} required />
            </label>
            <label>
                Password
                <input onChange={(e) => setPassword(e.target.value)} type="password" value={password} required />
            </label>
            <button type="submit">Log In</button>
            <button onClick={demoUser}>Demo User</button>
        </form>
    )
}

export default LoginFormPage;
