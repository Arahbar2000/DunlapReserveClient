export const roundTime = date => {
    const newDate = new Date()
    if (date.getUTCMinutes() <= 30 && date.getUTCMinutes() > 0) {
        newDate.setUTCHours(date.getUTCHours(), 30, 0, 0)
    }
    else if (date.getUTCMinutes() > 30) {
        newDate.setUTCHours(date.getUTCHours() + 1, 0, 0, 0)
    }
    else {
        newDate.setUTCMilliseconds(date.getUTCMilliseconds())
    }
    return newDate
}

export const dateToInterval = date => {
    const roundedDate = roundTime(date)
    const hours = roundedDate.getUTCHours()
    const minutes = roundedDate.getUTCMinutes()
    return (2 * hours) + (minutes / 30)

}

export const intervalToDate = interval => {
    const date = new Date()
    date.UTCHours(Math.floor(interval/2), 0, 0, 0)
    if(interval % 2) date.setUTCMinutes(30)
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