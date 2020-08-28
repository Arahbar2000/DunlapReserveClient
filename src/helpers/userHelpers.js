import axios from 'axios'
import {API_URL} from '../config'
export const signup = () => {
    return new Promise((resolve, reject) => {
        console.log(localStorage.getItem('token'))
        axios({
            url: API_URL + '/signup',
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            data: {access_token: localStorage.getItem('token')}
        }).catch(error => {
            console.log(error.response)
            return reject(error)
        })
        return resolve()
    })
}

export const getUserProfile = () => {
    const token = localStorage.getItem('token')
    console.log(token)
    return new Promise((resolve, reject) => {
        axios({
            url: API_URL +'/userProfile',
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            data: {access_token: token}
        }).then(res => {
            return resolve(res.data.user)
        }).catch(error => {
            return reject(error)
        })
    })
}