import React from 'react'
import { useGoogleLogin, useGoogleLogout } from 'react-google-login'
import { GOOGLE_CLIENT_ID } from '../config'

const GoogleAuthContext = React.createContext()

export const GoogleAuthProvider = ({ children }) => {

  const googleAuth = useGoogleLogin({
    clientId: GOOGLE_CLIENT_ID,
    isSignedIn: true
  })
  console.log(googleAuth)
  return (
    <GoogleAuthContext.Provider value={googleAuth}>
      {children}
    </GoogleAuthContext.Provider>
  )
}

export const useGoogleAuth = () => React.useContext(GoogleAuthContext)