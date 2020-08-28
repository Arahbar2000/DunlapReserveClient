import axios from 'axios'
import {API_URL} from '../config'

export const bookCourt = (data) => {
    data.access_token = localStorage.getItem('token')
    console.log(data)
    return new Promise((resolve, reject) => {
        axios({
            url: API_URL + '/book',
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            data
        })
        .then(res => resolve(res.data.user))
        .catch(error => reject(error))
    })
}

export const unbookCourt = () => {
    const access_token = localStorage.getItem('token')
    return new Promise((resolve, reject) => {
        axios({
            url: API_URL + '/unbook',
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            data: {access_token}
        })
        .then(res => resolve(res.data.user))
        .catch(error => reject(error))
    })
}