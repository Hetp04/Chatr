import React from 'react'
import { TextField } from '@mui/material'

function SignInComponent({ email, password, onSignInFormChange }) {
  return (
    <div className='auth-container'>
      <TextField
        id="outlined-username-input"
        label="Username"
        type="text"
        autoComplete="username"
        name="email"
        value={email}
        onChange={onSignInFormChange}
        sx={{
          marginBottom: "10px",
          '& label': { color: '#666666' },
          '& label.Mui-focused': { color: '#000000' },
          '& .MuiOutlinedInput-root': {
            color: '#000000',
            '& fieldset': { borderColor: '#E5E5E5' },
            '&:hover fieldset': { borderColor: '#CCCCCC' },
            '&.Mui-focused fieldset': { borderColor: '#000000' },
          }
        }}
      />

      {/* Password Field */}
      <TextField
        id="outlined-password-input"
        label="Password"
        type="password"
        autoComplete="current-password"
        name="password"
        value={password}
        onChange={onSignInFormChange}
        sx={{
          '& label': { color: '#666666' },
          '& label.Mui-focused': { color: '#000000' },
          '& .MuiOutlinedInput-root': {
            color: '#000000',
            '& fieldset': { borderColor: '#E5E5E5' },
            '&:hover fieldset': { borderColor: '#CCCCCC' },
            '&.Mui-focused fieldset': { borderColor: '#000000' },
          }
        }}
      />
    </div>
  )
}

export default SignInComponent
