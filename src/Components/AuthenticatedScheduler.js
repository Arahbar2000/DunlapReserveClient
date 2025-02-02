import React, {useEffect, useState} from 'react'
import FullCalendar, { CalendarDataManager } from '@fullcalendar/react'
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import {dateToInterval, intervalArray} from '../helpers/timeHelper'
import AddPlayer from './AddPlayer'
import { useUser } from '../Context/UserContext'
const { REACT_APP_API_URL } = process.env

const AuthenticatedScheduler = (props) => {
    const { userData } = useUser()
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

    const cancel = async => {
        calendar.current.getApi().unselect()
        setSelected(false)
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
        {userData.user != null ? 
        <AddPlayer
            unbook={unbook}
            book={book}
            selected={selected}
            selection={selection}
            cancel={cancel}
        />: null}
        <FullCalendar
            ref={calendar}
            plugins={[ resourceTimeGridPlugin, interactionPlugin ]}
            initialView={'resourceTimeGridDay'}
            resources={resources}
            events={REACT_APP_API_URL + '/events'}
            editable
            eventOverlap={false}
            selectable
            select={handleSelect}
            allDaySlot={false}
            slotMinTime={"06:00:00"}
            slotMaxTime={"22:00:00"}
            eventDidMount={eventMount}
            themeSystem={'bootstrap'}
            timeZone={false}
        />
        </div>
    )
}

export default AuthenticatedScheduler