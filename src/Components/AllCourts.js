import React, { useState, useEffect } from 'react'
import AddPlayer from './AddPlayer'
import Court from './Court'
import { useAuth0 } from "@auth0/auth0-react"
import { bookCourt, unbookCourt } from '../helpers/bookHelper'
import { getUserProfile } from '../helpers/userHelpers'

const AllCourts = () => {
    const { isAuthenticated, getAccessTokenSilently, isLoading, loginWithRedirect } = useAuth0()

    const [bookedCourt, setBookedCourt] = useState(0)
    const [user, setUser] = useState(null)
    const [booked, setBooked] = useState(false)


    const getProfile = async () => {
        const token = await getAccessTokenSilently()
        getUserProfile(token).then(user => {
            if(user.booking) {
                setBooked(true)
            }
            setUser(user)
        })
        .catch(error => {console.log('error with getting user profile', error)})
    }

    useEffect(() => {
        if (isAuthenticated) {
            getProfile()
        }
    }, [isAuthenticated])

    const book = async formData => {
        // calls api to book court at specified time
        const token = await getAccessTokenSilently()
        bookCourt(formData, token).then(user => {
            setUser(user)
            setBooked(true)
        })
        .catch(error => console.log('book error', error))
    }

    const unbook = async () => {
        // calls api to unbook court
        const token = await getAccessTokenSilently()
        unbookCourt(token)
        .then(user => {
            setUser(user)
            setBooked(false)
        })
    }

    let courts = []
    for(let i = 1; i <= 7; i += 3) {
        courts.push(<div key={i} className="row">
            <Court key={i} court={i} bookedCourt={bookedCourt} />
            <Court key={i+1} court={i+1} bookedCourt={bookedCourt} />
            <Court key={i+2} court={i+2} bookedCourt={bookedCourt} />
        </div>)
    }
    return  (
        <div>
            {isAuthenticated ? <AddPlayer book={book} unbook={unbook} user={user} booked={booked} /> : <h4>Sign in to book a court!</h4>}
            {/* Shows all 9 courts and maps their props */}
            <div className="container">
                {courts}
            </div>
        </div>
    )
}


export default AllCourts
