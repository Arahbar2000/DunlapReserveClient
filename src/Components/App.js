import React from 'react';
import { useAuth } from '../Context/AuthContext'
import { UserProvider }  from '../Context/UserContext'
// const AuthenticatedApp = React.lazy(() => import('./AuthenticatedApp'))
// const UnauthenticatedApp = React.lazy(() => import('./UnauthenticatedApp'))
import AuthenticatedApp from './AuthenticatedApp'
import UnauthenticatedApp from './UnauthenticatedApp'

const App = props => {
  const { data } = useAuth()
  console.log(data.auth)
  return data.auth ? <UserProvider><AuthenticatedApp/></UserProvider> : <UnauthenticatedApp />
}

export default App