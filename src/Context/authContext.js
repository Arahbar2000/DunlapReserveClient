import React, {useState, createContext, useReducer, useContext} from 'react'
import Loading from '../Components/Loading'
import { signup } from '../helpers/userHelpers'
import { useGoogleLogin, useGoogleLogout } from 'react-google-login'
const { REACT_APP_GOOGLE_CLIENT_ID } = process.env
const AuthContext = createContext()

const AuthProvider = props => {
    const [data, setData] = useState({auth: false, token: null, user: null})

    const handleLoginSuccess = data => {
        signup(data.wc.access_token)
        .then(user => setData({ ...data, auth: true, token: data.wc.access_token, user }))
    }

    const handleLogoutSuccess = () => {
        setData({ ...data, auth: false, token: null, user: null })
    }

    const handleLogoutFailure = () => {
        setData({ ...data, auth: false, token: null, user: null })
    }


    const { signIn, loaded } = useGoogleLogin({
        clientId: REACT_APP_GOOGLE_CLIENT_ID,
        onSuccess: handleLoginSuccess,
        onFailure: () => setData({ ...data, auth: false, token: null, user: null }),
        isSignedIn: true
    })

    const { signOut } = useGoogleLogout({
        clientId: REACT_APP_GOOGLE_CLIENT_ID,
        onLogoutSuccess: handleLogoutSuccess,
        onFailure: handleLogoutFailure
    })

    if(!loaded) {
        return <Loading />
    }

    return <AuthContext.Provider value={{data, signIn, signOut}} {...props} />
}

export const useAuth = () => useContext(AuthContext)
export default AuthProvider


