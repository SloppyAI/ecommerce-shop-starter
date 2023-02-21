/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/* eslint-disable jsx-a11y/anchor-is-valid */
const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetch('http://localhost:8000/user?user=' + user)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        // console.log(resp);
        // console.log(resp[0].role);
        // console.log(resp[0].pwd);
        if (Object.keys(resp).length === 0) {
          alert('Please Enter valid username');
        } else {
          if (resp[0].pwd === pwd) {
            alert('Success');
            sessionStorage.setItem('username', user);
            navigate('/');
          } else {
            alert('Please Enter valid credentials');
          }
        }
      })
      .catch((err) => {
        alert('Login Failed due to :' + err.message);
      });
  };

  return (
    <>
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="mt-3 flex justify-between items-center">
              <label>Username</label>
              <input
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
                type="text"
                className="mt-1 p-2 bg-blue-100 rounded-lg"
                placeholder="Enter username"
              />
            </div>

            <div className="mt-3 flex justify-between items-center">
              <label>Password</label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                className="mt-1 p-2 bg-blue-100 rounded-lg"
                placeholder="Enter password"
              />
            </div>
            <div className="grid gap-2 mt-4">
              <button
                type="submit"
                className="max-w-[300px] mx-auto py-2 px-4 bg-blue-500 text-white rounded-lg"
              >
                Submit
              </button>
            </div>
            <Link to="/signup">
              <p className="forgot-password text-center text-blue-600 mt-4">
                Need an account ? <a href="#">Sign up</a>
              </p>
            </Link>

            <Link to="/">
              <p className="forgot-password text-center text-blue-600 mt-2">
                Back to home
              </p>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
