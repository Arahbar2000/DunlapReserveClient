import React, {useState, useEffect} from 'react'
import { useAuth0 } from "@auth0/auth0-react"
import { getCourtState } from '../helpers/courtHelpers'
import tennisCourt from './tennis_court_image.jpg'
import './Court.css'

// Component that handles a single court
function Court(props) {
    const { getAccessTokenSilently, isAuthenticated } = useAuth0()
    const [player, setPlayer] = useState('Empty')
    // If user clicks on a court and user has not booked a court, allow user to select a court
    // border of court turns blue when court is selected by user

    useEffect(() => {
        const fetchCourt = async () => {
            getCourtState(props.court)
            .then(data => {
                if(!data.empty) {
                    setPlayer(data.user.displayName)
                }
            })
            .catch(error => console.log(`error getting court ${props.court} data`, error))
        }
        // fetch latest court data
        fetchCourt()

    }, [isAuthenticated, props.court, getAccessTokenSilently])
    
    return (
        <div className="col">
            <h4>Court {player}</h4>
            <img src={tennisCourt} alt='tennis court' />
        </div>
    )
}

export default React.memo(Court)