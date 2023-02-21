/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const USER_REGEX = /^[A-z\s][A-z0-9-_\s]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const REGISTER_URL = 'http://localhost:8000/user';

const Signup = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const role = 'user';

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd, matchPwd]);

  //   const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg('Invalid Entry');
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ user, email, pwd, role }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      // console.log(response?.data);
      // console.log(response?.accessToken);
      // console.log(JSON.stringify(response));
      setSuccess(true);
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setUser('');
      setEmail('');
      setPwd('');
      setMatchPwd('');
      alert('Signup succesful!');
      navigate('/login');
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 409) {
        setErrMsg('Username Taken');
      } else {
        setErrMsg('Registration Failed');
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      <section>
        <p
          ref={errRef}
          className={errMsg ? 'errmsg' : 'offscreen'}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <div className="Auth-form-container">
          <form className="Auth-form" onSubmit={handleSubmit}>
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Sign Up</h3>
              <div className="mt-3">
                <label htmlFor="username">
                  Username
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validName ? 'valid' : 'hide'}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validName || !user ? 'hide' : 'invalid'}
                  />
                </label>
                <input
                  type="text"
                  id="username"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  required
                  aria-invalid={validName ? 'false' : 'true'}
                  aria-describedby="uidnote"
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                  className="w-full mt-1 p-2 bg-blue-100"
                  placeholder="User Name"
                />
                <p
                  id="uidnote"
                  className={
                    userFocus && user && !validName
                      ? 'instructions'
                      : 'offscreen'
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  4 to 24 characters.
                  <br />
                  Must begin with a letter.
                  <br />
                  Letters, numbers, underscores, hyphens allowed.
                </p>
              </div>

              <div className="mt-3">
                <label htmlFor="email">
                  Email
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validEmail ? 'valid' : 'hide'}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validEmail || !email ? 'hide' : 'invalid'}
                  />
                </label>
                <input
                  type="text"
                  id="email"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  aria-invalid={validEmail ? 'false' : 'true'}
                  aria-describedby="emailnote"
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                  className="w-full mt-1 p-2 bg-blue-100"
                  placeholder="Email"
                />
                <p
                  id="uidnote"
                  className={
                    emailFocus && email && !validEmail
                      ? 'instructions'
                      : 'offscreen'
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  Email format not corrected
                </p>
              </div>

              <div className="mt-3">
                <label htmlFor="password">
                  Password:
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validPwd ? 'valid' : 'hide'}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validPwd || !pwd ? 'hide' : 'invalid'}
                  />
                </label>
                <input
                  type="password"
                  id="password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                  aria-invalid={validPwd ? 'false' : 'true'}
                  aria-describedby="pwdnote"
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                  className="w-full mt-1 p-2 bg-blue-100"
                  placeholder="Enter password"
                />
                <p
                  id="pwdnote"
                  className={
                    pwdFocus && !validPwd ? 'instructions' : 'offscreen'
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  8 to 24 characters.
                  <br />
                  Must include uppercase and lowercase letters, a number and a
                  special character.
                  <br />
                  Allowed special characters:{' '}
                  <span aria-label="exclamation mark">!</span>{' '}
                  <span aria-label="at symbol">@</span>{' '}
                  <span aria-label="hashtag">#</span>{' '}
                  <span aria-label="dollar sign">$</span>{' '}
                  <span aria-label="percent">%</span>
                </p>
              </div>

              <div className="mt-3">
                <label htmlFor="confirm_pwd">
                  Confirm Password:
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validMatch && matchPwd ? 'valid' : 'hide'}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validMatch || !matchPwd ? 'hide' : 'invalid'}
                  />
                </label>
                <input
                  type="password"
                  id="confirm_pwd"
                  onChange={(e) => setMatchPwd(e.target.value)}
                  value={matchPwd}
                  required
                  aria-invalid={validMatch ? 'false' : 'true'}
                  aria-describedby="confirmnote"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                  className="w-full mt-1 p-2 bg-blue-100"
                  placeholder="Confirm password"
                />
                <p
                  id="confirmnote"
                  className={
                    matchFocus && !validMatch ? 'instructions' : 'offscreen'
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  Must match the first password input field.
                </p>
              </div>

              <div className="grid gap-2 mt-4">
                <button
                  type="submit"
                  className="max-w-[300px] mx-auto py-2 px-4 bg-blue-500 text-white rounded-lg"
                  disabled={
                    !validName || !validPwd || !validMatch ? true : false
                  }
                >
                  Sign Up
                </button>
              </div>
              <Link to="/login">
                <p className="forgot-password text-center text-blue-600 mt-4">
                  Already have an account ? <a>Sign in</a>
                </p>
              </Link>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Signup;
