import axios from 'axios'
import { access } from 'fs'
const {REACT_APP_API_URL} = process.env
export const signup = access_token => {
    return new Promise((resolve, reject) => {
        axios({
            url: REACT_APP_API_URL + '/signup',
            method: 'POST',
            headers: { 'Content-Type': 'application/json'  },
            data: { access_token }
        })
        .then(res => {console.log(res.data.user); return resolve(res.data.user)})
        .catch(error => {
            return reject(error)
        })
    })
}

export const getUserProfile = access_token => {
    return new Promise((resolve, reject) => {
        axios({
            url: REACT_APP_API_URL +'/userProfile',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: { access_token }
        }).then(res => {
            return resolve(res.data.user)
        }).catch(error => {
            return reject(error)
        })
    })
}