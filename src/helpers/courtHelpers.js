import axios from 'axios'
const { REACT_APP_API_URL } = process.env

export const getCourtState = (court) => {
    return new Promise((resolve, reject) => {
        axios({
            url: REACT_APP_API_URL + '/court',
            method: 'POST',
            headers: {'content-type': 'application/json'},
            data: {court}
        })
        .then(res => resolve(res.data))
        .catch(error => reject(error))
    })
}