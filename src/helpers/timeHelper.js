export const getTimes = (start) => {
    const minStartDate = new Date()
    let minStartTime = new Date()
    if(start.getDate() > minStartDate.getDate()) {
        minStartTime.setTime(start.getTime())
        minStartTime.setHours(7, 0, 0, 0)
    }
    let maxStartTime = new Date(start.getTime())
    maxStartTime.setHours(22, 0, 0, 0)
    const maxStartDate = new Date()
    maxStartDate.setDate(minStartDate.getDate() + 1)

    return [minStartDate, maxStartDate, minStartTime, maxStartTime]
}

export const roundTime = date => {
    const newDate = new Date()
    if (date.getMinutes() <= 30 && date.getMinutes() > 0) {
        newDate.setHours(date.getHours(), 30, 0, 0)
    }
    else if (date.getMinutes() > 30) {
        newDate.setHours(date.getHours() + 1, 0, 0, 0)
    }
    else {
        newDate.setTime(date.getTime())
    }
    return newDate
}

export const dateToInterval = date => {
    const roundedDate = roundTime(date)
    const hours = roundedDate.getHours()
    const minutes = roundedDate.getMinutes()
    return (2 * hours) + (minutes / 30)

}

export const intervalToDate = interval => {
    const date = new Date()
    date.setHours(Math.floor(interval/2), 0, 0, 0)
    if(interval % 2) date.setMinutes(30)
    return date
}

export const intervalArray = (start, end) => {
    if(start > end) {
        throw Error('start must be <= end')
    }
    let intervals = new Array(end-start+1)
    for(let i = 0; i < intervals.length; i++, start++) {
        intervals[i] = start
    }
    return intervals
}