import axios from 'axios'
// create an axios instance
const service = axios.create({
    baseURL: 'https://api.haomantech.cn', // api的base_url
    timeout: 5000 // request timeout
  })

export default service