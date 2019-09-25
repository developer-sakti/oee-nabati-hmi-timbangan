import axios from 'axios';

export default {
    API_MAIN: axios.create({
        baseURL: "http://dev-oee-sim.machinevision.global:8081/api/v1/",
        timeout: 30000
    })
}