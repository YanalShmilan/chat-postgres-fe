import React, { useState, Fragment } from 'react';
import './Navbar.scss';
import { useSelector, useDispatch } from 'react-redux';
import avatar from '../../assets/images/avatar.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router';
import { signout, updateProfile } from '../../store/actions/auth';
import Modal from '../Modal/Modal';
export default function Navbar() {
  const user = useSelector((state) => state.authReducer.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [profileOptions, setProfileOptions] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  });
  const handleChange = (e) => {
    if (e.target.name === 'avatar') {
      setUserInfo({ ...userInfo, avatar: e.target.files[0] });
    } else {
      setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in userInfo) {
      formData.append(key, userInfo[key]);
    }
    if (userInfo.password === '') {
      formData.delete('password');
    }

    dispatch(updateProfile(formData));
    setShowProfileModal(false);
  };

  return (
    <div id="navbar">
      <h2>Chat.io</h2>
      <div
        onClick={() => {
          setProfileOptions(!profileOptions);
        }}
        id="profile-menu"
      >
        <img
          width="40"
          height="40"
          src={!user.avatar.endsWith('null') ? user.avatar : avatar}
          alt="Avatar"
        />
        <p>
          {user.firstName} {user.lastName}
        </p>
        <FontAwesomeIcon icon="caret-down" className="fa-icon" />
        {profileOptions && (
          <div id="profile-options">
            <p onClick={() => setShowProfileModal(true)}>Update profile</p>
            <p onClick={() => dispatch(signout(navigate))}>Signout</p>
          </div>
        )}
        {showProfileModal && (
          <Modal click={() => setShowProfileModal(false)}>
            <Fragment key="header">
              <h3 className="m-0">Update profile</h3>
            </Fragment>
            <Fragment key="body">
              {' '}
              <form onSubmit={handleSubmit}>
                <div className="input-field">
                  <input
                    placeholder="First name"
                    onChange={handleChange}
                    name="firstName"
                    value={userInfo.firstName}
                    required
                  />
                </div>
                <div className="input-field">
                  <input
                    placeholder="Last name"
                    onChange={handleChange}
                    name="lastName"
                    value={userInfo.lastName}
                    required
                  />
                </div>
                <div className="input-field">
                  <input
                    placeholder="Email"
                    onChange={handleChange}
                    name="email"
                    value={userInfo.email}
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
                <div className="input-field">
                  <input type="file" name="avatar" onChange={handleChange} />
                </div>
              </form>
            </Fragment>
            <Fragment key="footer">
              <button className="btn-success" onClick={handleSubmit}>
                Update
              </button>
            </Fragment>
          </Modal>
        )}
      </div>
    </div>
  );
}
