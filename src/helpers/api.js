import axios from 'axios';

export default {
    API_MAIN: axios.create({
        baseURL: 'http://ec2-18-136-95-199.ap-southeast-1.compute.amazonaws.com:8081/api/v1/',
        timeout: 30000
    })
}