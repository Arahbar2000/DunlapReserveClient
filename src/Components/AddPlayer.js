import React from 'react'
import "react-datepicker/dist/react-datepicker.css";
import './AddPlayer.css'
import { useUser } from '../Context/UserContext'

// Form for booking or unbooking a court
function AddPlayer(props) {
    const { userData } = useUser()
    return (
        <div>
            {!userData.user.booking ?  props.selected ? 
            <div>
                <button onClick={props.book}>Book?</button>
                <button onClick={props.cancel}>Cancel</button>
            </div>: null :
            <button onClick={() => props.unbook()}>Unbook court</button>}
        </div>
    )
}

function getEnd(start, hours) {
    return new Date(start.getTime() + (hours*60*60000))
}

export default AddPlayer