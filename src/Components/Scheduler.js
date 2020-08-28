import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom'
import {useAuth0} from "@auth0/auth0-react"
import FullCalendar, { CalendarDataManager } from '@fullcalendar/react'
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import {dateToInterval, intervalArray} from '../helpers/timeHelper'
import {bookCourt, unbookCourt} from '../helpers/bookHelper'
import AddPlayer from './AddPlayer'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import EventPopover from './EventPopover'

const Scheduler = (props) => {
    const calendar = React.createRef()
    const [selected, setSelected] = useState(false)
    const [selection, setSelection] = useState({})
    let resources = []
    for(let i = 1; i <= 9; i++) {
        resources.push({id: i, title: `Court ${i}`})
    }

    const handleSelect = async ({start, end, resource}) => {
        const court = resource.id
        const startInterval = dateToInterval(start)
        const endInterval = dateToInterval(end)
        const intervals = intervalArray(startInterval, endInterval)
        const date = start.getDate()
        setSelected(true)
        setSelection({date, court, intervals})
    }

    const book = async () => {
        await props.book(selection)
        calendar.current.getApi().refetchEvents()
    }

    const unbook = async () => {
        await props.unbook()
        calendar.current.getApi().refetchEvents()
    }


    const eventMount = (info) => {
          if(info.event.id != localStorage.getItem('id')) {
              info.event.editable = false
          }
          else {
              info.event.editable = true
          }
    }
     return (
        <div>
        <AddPlayer
            unbook={unbook}
            booked={props.booked}
            book={book}
            selected={selected}
            selection={selection}
        />
        <FullCalendar
            ref={calendar}
            plugins={[ resourceTimeGridPlugin, interactionPlugin ]}
            initialView={'resourceTimeGridDay'}
            resources={resources}
            events={'http://localhost:5000/events'}
            editable
            eventOverlap={false}
            selectable
            select={handleSelect}
            allDaySlot={false}
            slotMinTime={"06:00:00"}
            slotMaxTime={"22:00:00"}
            eventDidMount={eventMount}
            themeSystem={'bootstrap'}
        />
        </div>
    )
}

export default Scheduler