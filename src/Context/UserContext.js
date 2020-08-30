import React, { createContext, useContext, useState } from 'react'
import { useAuth } from './AuthContext'
import { getUserProfile } from '../helpers/userHelpers'
const UserContext = createContext()

const UserProvider = props => {
    const { data } = useAuth()
    const [userData, setUserData] = useState({user: data.user, loading: false, error: false})


    const updateUser = user => {
        if (user != null) {
            setUserData({ ...userData, user})
        }
        else {
            setUserData({ ...userData, loading: true })
            getUserProfile()
            .then(user => setUserData({ ...userData, user, loading: false }))
            .catch(error => setUserData({ error: true, loading: false }))
        }
    }

    return <UserContext.Provider value={{userData, updateUser}} {...props} />
}

const useUser = () => useContext(UserContext)
export { UserProvider, useUser }