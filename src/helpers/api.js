import axios from 'axios';

export default {
    API_MAIN: axios.create({
        baseURL: process.env.API_URL,
        timeout: 30000
    })
}