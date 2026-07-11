import React from 'react'
import { TextField } from '@mui/material'

function SignUpComponent({ firstName, lastName, email, password, onSignUpFormType }) {
  return (
    <div className='auth-container'>
      {/* Username Field */}
      <div className='name-container'>
        <TextField
          label="First Name"
          type="text"
          name='firstName'
          value={firstName}
          onChange={onSignUpFormType}
          sx={{
            marginRight: "10px",
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
        <TextField
          label="Last Name"
          type="text"
          name='lastName'
          value={lastName}
          onChange={onSignUpFormType}
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
      </div>
      <TextField
        label="Username"
        type="text"
        name="email"
        value={email}
        onChange={onSignUpFormType}
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
        onChange={onSignUpFormType}
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

export default SignUpComponent
