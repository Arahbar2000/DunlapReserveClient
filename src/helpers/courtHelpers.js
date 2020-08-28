import axios from 'axios'
import { API_URL } from '../config'

export const getCourtState = (court) => {
    return new Promise((resolve, reject) => {
        axios({
            url: API_URL + '/court',
            method: 'POST',
            headers: {'content-type': 'application/json'},
            data: {court}
        })
        .then(res => resolve(res.data))
        .catch(error => reject(error))
    })
}