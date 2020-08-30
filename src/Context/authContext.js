import React, {createContext, useReducer} from 'react'
export const AuthContext = createContext()
const initialState = {
    isAuthenticated: false,
    user: null,
    token: null,
}

const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                isAuthenitcated: true, 
                user: action.payload.user
            }
        case "LOGOUT":
            return {
                ...state, 
                isAuthenitcated: false, 
                user: null
            }
        case "ERROR":
            return {
                ...state, 
                isAuthenticated: false, 
                error: action.payload.error, 
                user: null
            }
    }
}



const AuthProvider = props => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const { signIn, loaded } = useGoogleLogin({
        clientId: REACT_APP_GOOGLE_CLIENT_ID,
        onSuccess: (data) => dispatch({type: 'LOGIN', payload: {token: data.wc.access_token}}),
        onFailure: () => dispatch({type: 'ERROR'}),
        isSignedIn: true
    })

    const { signOut } = useGoogleLogout({
    clientId: REACT_APP_GOOGLE_CLIENT_ID,
    onSuccess: () => dispatch({type: 'LOGOUT'}),
    onFailure: () => dispatch({type: 'ERROR'})
    })
}


