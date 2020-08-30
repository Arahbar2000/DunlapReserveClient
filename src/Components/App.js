import React from 'react';
import { useAuth } from '../../../DunlapReserveServer/Context/AuthContext'
// const AuthenticatedApp = React.lazy(() => import('./AuthenticatedApp'))
// const UnauthenticatedApp = React.lazy(() => import('./UnauthenticatedApp'))
import AuthenticatedApp from './AuthenticatedApp'
import UnauthenticatedApp from './UnauthenticatedApp'

const App = props => {
  const { data } = useAuth()
  console.log(data.auth)
  return data.auth ? <AuthenticatedApp /> : <UnauthenticatedApp />
}

export default App