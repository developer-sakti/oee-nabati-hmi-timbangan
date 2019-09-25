import axios from 'axios';

export default {
    API_MAIN: axios.create({
        baseURL: "http://192.168.13.2:8081/api/v1/",
        timeout: 30000
    })
}