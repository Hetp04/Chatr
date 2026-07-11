import React, { useState } from 'react'
import logo from '../../images/logo.png'
import './SingupPageStyle.css'
import baseUrl from '../config/baseUrl';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';

function AuthenticationPage() {
  const navigate = useNavigate();
  const { saveUser } = useAuth();

  const [tabValue, setTabValue] = useState("1"); // "1" = sign up, "2" = sign in

  const [signUpData, setSignUpData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })

  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  })

  const handleSignUpFormChange = (e) => {
    const { name, value } = e.target;
    setSignUpData({ ...signUpData, [name]: value })
  }

  const handleSignInFormChange = (e) => {
    const { name, value } = e.target
    setSignInData({ ...signInData, [name]: value })
  }

  const handleSignIn = () => {
    const url = `${baseUrl}/api/v1/auth/authenticate`
    axios.post(url, { email: signInData.email, password: signInData.password })
      .then((res) => {
        saveUser({ username: res.data.email, token: res.data.accessToken, userId: res.data.userId })
        navigate("/chats")
        setSignInData({ email: '', password: '' })
      })
      .catch(() => {})
  }

  const handleSignUp = async () => {
    const url = `${baseUrl}/api/v1/auth/signup`
    axios.post(url, {
      firstName: signUpData.firstName,
      lastName: signUpData.lastName,
      email: signUpData.email,
      password: signUpData.password
    })
      .then((res) => {
        saveUser({ username: res.data.email, token: res.data.accessToken, userId: res.data.userId })
        navigate("/chats")
        setSignUpData({ firstName: '', lastName: '', email: '', password: '' })
      })
      .catch(() => {})
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      tabValue === "1" ? handleSignUp() : handleSignIn()
    }
  }

  return (
    <div className='auth-page-container'>
      <div className='signIn-container'>
        <div className='auth-card'>
          <img src={logo} className='auth-logo' alt="Chatr logo" />
          <h1>Chatr</h1>
          <p className='auth-subtitle'>
            {tabValue === "1" ? "Create your account to start chatting" : "Welcome back"}
          </p>

          {/* Custom Tab Switcher */}
          <div className='auth-tabs'>
            <button
              className={`auth-tab-btn ${tabValue === "1" ? "active" : ""}`}
              onClick={() => setTabValue("1")}
            >
              Sign up
            </button>
            <button
              className={`auth-tab-btn ${tabValue === "2" ? "active" : ""}`}
              onClick={() => setTabValue("2")}
            >
              Sign in
            </button>
          </div>

          <div className='auth-container' onKeyDown={handleKeyDown}>
            {tabValue === "1" ? (
              <>
                <div className='name-container'>
                  <div className='auth-input-group' style={{ flex: 1 }}>
                    <label className='auth-input-label'>First name</label>
                    <input
                      className='auth-input'
                      type="text"
                      name='firstName'
                      placeholder='John'
                      value={signUpData.firstName}
                      onChange={handleSignUpFormChange}
                    />
                  </div>
                  <div className='auth-input-group' style={{ flex: 1 }}>
                    <label className='auth-input-label'>Last name</label>
                    <input
                      className='auth-input'
                      type="text"
                      name='lastName'
                      placeholder='Doe'
                      value={signUpData.lastName}
                      onChange={handleSignUpFormChange}
                    />
                  </div>
                </div>
                <div className='auth-input-group'>
                  <label className='auth-input-label'>Username</label>
                  <input
                    className='auth-input'
                    type="text"
                    name='email'
                    placeholder='johndoe123'
                    value={signUpData.email}
                    onChange={handleSignUpFormChange}
                  />
                </div>
                <div className='auth-input-group'>
                  <label className='auth-input-label'>Password</label>
                  <input
                    className='auth-input'
                    type="password"
                    name='password'
                    placeholder='Min. 8 characters'
                    value={signUpData.password}
                    onChange={handleSignUpFormChange}
                  />
                </div>
                <button className='auth-submit-btn' onClick={handleSignUp}>
                  Create account →
                </button>
              </>
            ) : (
              <>
                <div className='auth-input-group'>
                  <label className='auth-input-label'>Username</label>
                  <input
                    className='auth-input'
                    type="text"
                    name='email'
                    placeholder='johndoe123'
                    value={signInData.email}
                    onChange={handleSignInFormChange}
                  />
                </div>
                <div className='auth-input-group'>
                  <label className='auth-input-label'>Password</label>
                  <input
                    className='auth-input'
                    type="password"
                    name='password'
                    placeholder='Your password'
                    value={signInData.password}
                    onChange={handleSignInFormChange}
                  />
                </div>
                <button className='auth-submit-btn' onClick={handleSignIn}>
                  Continue →
                </button>
              </>
            )}
          </div>

          <p className='auth-footer-text'>
            By continuing, you agree to our Terms &amp; Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AuthenticationPage
