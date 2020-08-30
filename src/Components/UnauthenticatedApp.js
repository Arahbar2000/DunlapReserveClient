import React from 'react';
import Error from './Error'
import {Switch, Route} from 'react-router-dom'
import Navbar from './Navbar'
import { useAuth } from '../../../DunlapReserveServer/Context/AuthContext'
import UnauthenticatedScheduler from './UnauthenticatedScheduler'

const UnauthenticatedApp = () => {

    const { signIn, signOut } = useAuth()

    return (
        <main>
        <Navbar signin={signIn} signout={signOut} auth={false} />
        <div className="container">
            <Switch>
                <Route exact path='/' component={() => <UnauthenticatedScheduler isAuthenticated={false}/>} />
                <Route component={Error} />
            </Switch>
        </div>
        </main>
    )
}

export default UnauthenticatedApp