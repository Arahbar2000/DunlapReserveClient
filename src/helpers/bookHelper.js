import axios from 'axios'
const {REACT_APP_API_URL} = process.env

export const bookCourt = (data) => {
    return new Promise((resolve, reject) => {
        axios({
            url: REACT_APP_API_URL + '/book',
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            data
        })
        .then(res => resolve(res.data.user))
        .catch(error => reject(error))
    })
}

export const unbookCourt = (access_token) => {
    return new Promise((resolve, reject) => {
        axios({
            url: REACT_APP_API_URL + '/unbook',
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            data: { access_token }
        })
        .then(res => resolve(res.data.user))
        .catch(error => reject(error))
    })
}