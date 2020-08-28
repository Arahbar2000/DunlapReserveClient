import React, {useState} from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import './AddPlayer.css'
import { getTimes, roundTime, dateToInterval, intervalArray } from '../helpers/timeHelper'

// Form for booking or unbooking a court
function AddPlayer(props) {
    const handleSubmit = async (event) => {
        event.preventDefault()
        const endTime  = getEnd(start, length.value)
        const intervals = intervalArray(dateToInterval(start), dateToInterval(endTime))
        const formData = {
            court: courtNumber.valueAsNumber,
            date: start.getDate(),
            intervals
        }
        props.book(formData)
    }
    const [start, setStart] = useState(roundTime(new Date()))
    const [minStartDate, maxStartDate, minStartTime, maxStartTime] = getTimes(start)
    let courtNumber = 0;
    let length = 0;

    const success = (data) => {
        console.log(data)
    }

    const failure = data => {
        console.log(data)
    }


    return (
        <div>
            {!props.booked ?  props.selected ? <button onClick={props.book}>Book?</button> : null :
            <button onClick={() => props.unbook()}>Unbook court</button>}
        </div>
    )
}

function getEnd(start, hours) {
    return new Date(start.getTime() + (hours*60*60000))
}

export default AddPlayer