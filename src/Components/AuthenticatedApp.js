import React from 'react';
import Error from './Error'
import {Switch, Route} from 'react-router-dom'
import Navbar from './Navbar'
import { bookCourt, unbookCourt } from '../helpers/bookHelper'
import { useUser } from '../../../DunlapReserveServer/Context/UserContext'
import { useAuth } from '../../../DunlapReserveServer/Context/AuthContext'
import AuthenticatedScheduler from './AuthenticatedScheduler'

// Root component that handles routing for all components
const AuthenticatedApp = () => {

    const { userData, updateUser } = useUser()
    const { signIn, signOut, data } = useAuth()

    const book = async (info) => {
      info.access_token = data.token
      bookCourt(info)
      .then(user => {
          updateUser(user)
      })
      .catch(error => console.log('error booking', error))
    }

    const unbook = async () => {
      unbookCourt(data.token)
      .then(user => {
          updateUser(user)
      })
      .catch(error => console.log('error unbooking', error))
    }

  return (
    <main>
      <Navbar signin={signIn} signout={signOut} auth={true} />
      <div className="container">
        <Switch>
          <Route exact path='/' component={() => <AuthenticatedScheduler book={book} unbook={unbook} isAuthenticated={true}/>} />
          <Route component={Error} />
        </Switch>
      </div>
    </main>
  )
}

export default AuthenticatedApp