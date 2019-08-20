import axios from 'axios';

export default {
    API_MAIN: axios.create({
        baseURL: 'http://ec2-13-250-42-181.ap-southeast-1.compute.amazonaws.com:8081/api/v1/',
        timeout: 30000,
        headers: {
            'Authorization': localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}`:''
        }
    })
}