import React, { useState, useEffect } from 'react';
import AllCourts from './AllCourts'
import Scheduler from './Scheduler'
import Error from './Error'
import {Switch, Route} from 'react-router-dom'
import Navbar from './Navbar'
import { useGoogleLogin, useGoogleLogout } from 'react-google-login'
import {getUserProfile} from '../helpers/userHelpers'
import { bookCourt, unbookCourt } from '../helpers/bookHelper'

const { REACT_APP_GOOGLE_CLIENT_ID } = process.env

// Root component that handles routing for all components
const App = () => {
  const [booked, setBooked] = useState(false)
  const [isAuthenticated, setAuth] = useState(false)
  const handleLoginSuccess = (data) => {
    setAuth(true)
    localStorage.setItem('token', data.wc.access_token)
    localStorage.setItem('id', data.googleId)
  }

  const handleLoginFailure = data => {
    setAuth(false)
    localStorage.removeItem('token')
    localStorage.removeItem('id')
  }

  const handleLogoutSuccess = () => {
    setAuth(false)
    localStorage.removeItem('token')
    localStorage.removeItem('id')
  }

  const handleLogoutFailure = () => {
    setAuth(false)
    localStorage.removeItem('token')
    localStorage.removeItem('id')
  }

  const { signIn, loaded } = useGoogleLogin({
    clientId: REACT_APP_GOOGLE_CLIENT_ID,
    onSuccess: handleLoginSuccess,
    onFailure: handleLoginFailure,
    isSignedIn: true
  })


  const { signOut } = useGoogleLogout({
    clientId: REACT_APP_GOOGLE_CLIENT_ID,
    onSuccess: handleLogoutSuccess,
    onFailure: handleLogoutFailure
  })

  const getUser = () => {
    getUserProfile().then(res => {
      console.log(res)
      if(res.booking) {
        setBooked(true)
      }
    })
  }

  useEffect(() => {
    if(isAuthenticated) {
      getUser()
    }
  })

  const book = async (data) => {
    bookCourt(data)
    .then(user => {
      console.log(user)
      if(user.booking) {
        setBooked(true)
      }
      else {
        setBooked(false)
      }
    })
  }

  const unbook = async () => {
    unbookCourt()
    .then(user => {
        if(!user.booking) {
          setBooked(false)
        }
        else {
          setBooked(true)
        }
    })
}

  return (
    <main>
      <Navbar signin={signIn} signout={signOut} auth={isAuthenticated} />
      <div className="container">
        <Switch>
          <Route exact path='/' component={() => <Scheduler booked={booked} book={book} unbook={unbook}/>} />
          <Route component={Error} />
        </Switch>
      </div>
    </main>
  )
}

export default App