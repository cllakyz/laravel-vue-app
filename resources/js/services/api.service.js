import axios from 'axios';

export default axios.create({
    baseURL: 'http://dev.laravelvueapp.com/api/',
    timeout: 5000,
    headers: {
        'Authorization': 'Bearer xxx',
        'Content-Type': 'application/json'
    }
});
