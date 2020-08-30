import React, {useEffect, useState} from 'react'
import FullCalendar, { CalendarDataManager } from '@fullcalendar/react'
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import {dateToInterval, intervalArray} from '../helpers/timeHelper'
import AddPlayer from './AddPlayer'
const { REACT_APP_API_URL } = process.env

const UnauthenticatedScheduler = () => {
    const calendar = React.createRef()
    let resources = []
    for(let i = 1; i <= 9; i++) {
        resources.push({id: i, title: `Court ${i}`})
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
        <FullCalendar
            ref={calendar}
            plugins={[ resourceTimeGridPlugin, interactionPlugin ]}
            initialView={'resourceTimeGridDay'}
            resources={resources}
            events={REACT_APP_API_URL + '/events'}
            eventOverlap={false}
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

export default UnauthenticatedScheduler