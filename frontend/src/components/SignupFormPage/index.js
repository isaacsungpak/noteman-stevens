import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./SignupFormPage.css";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email: email.trim(), username: username.trim(), password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Password and Confirm Password must match.']);
  };

  return (
    <>
      <br />
      <p className='signup-login-title'>Sign Up</p>
      <form onSubmit={handleSubmit}>
        <ul className="val-errors">
          {errors.map((err, i) => <li key={i}>{err}</li>)}
        </ul>

        <input onChange={(e) => setEmail(e.target.value)} type="text" value={email} required placeholder='Email'/>

        <br />
        <br />

        <input onChange={(e) => setUsername(e.target.value)} type="text" value={username} required placeholder='Username'/>

        <br />
        <br />

        <input onChange={(e) => setPassword(e.target.value)} type="password" value={password} required placeholder='Password'/>

        <br />
        <br />


        <input onChange={(e) => setConfirmPassword(e.target.value)} type="password" value={confirmPassword} required placeholder='Confirm Password'/>

        <br />
        <br />

        <button type="submit">Sign Up</button>
      </form>
      <br />
    </>
  );
}

export default SignupFormPage;
