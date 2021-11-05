import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import loginImage from '../../assets/images/login.svg';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../../store/actions/auth';
import { useNavigate, Navigate } from 'react-router-dom';
export default function Signin() {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });
  const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signin(userInfo, navigate));
  };
  if (isLoggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <div id="auth-container">
      <div id="auth-card">
        <div>
          <div id="image-section">
            <img src={loginImage} alt="login" />
          </div>
          <div id="form-section">
            <h2>Welcone back</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-field mb-1">
                <input
                  placeholder="Email"
                  name="email"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="input-field mb-1">
                <input
                  placeholder="Password"
                  name="password"
                  required
                  type="password"
                  onChange={handleChange}
                />
              </div>
              <button>Sign In</button>
              <p>
                Don't have an account? <Link to="/signup">Signup</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
