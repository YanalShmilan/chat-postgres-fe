import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import signupImage from '../../assets/images/register.svg';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../store/actions/auth';

export default function Signup() {
  const [userInfo, setUserInfo] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup(userInfo, navigate));
  };

  return (
    <div id="auth-container">
      <div id="auth-card">
        <div>
          <div id="image-section">
            <img src={signupImage} alt="signup" />
          </div>
          <div id="form-section">
            <h2>Create an account</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-field">
                <input
                  placeholder="First name"
                  onChange={handleChange}
                  name="firstName"
                  required
                />
              </div>
              <div className="input-field">
                <input
                  placeholder="Last name"
                  onChange={handleChange}
                  name="lastName"
                  required
                />
              </div>
              <div className="input-field">
                <input
                  placeholder="Email"
                  onChange={handleChange}
                  name="email"
                  required
                />
              </div>
              <div className="input-field">
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  required
                  placeholder="Password"
                />
              </div>
              <button>Signup</button>
              <p>
                Already have an account? <Link to="/signin">Signin</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
