import axios from 'axios';

let instance = axios.create({
    baseURL: 'http://dev.laravelvueapp.com/api/',
    timeout: 5000,
    headers: {
        'Authorization': 'Bearer xxx',
        'Content-Type': 'application/json'
    }
});

instance.interceptors.request.use(function(config){
    console.log('Request Yapıldı ('+config.method+')', config.baseURL + config.url);
    return config;
});

instance.interceptors.response.use(function(response){
    console.log('Response geldi ('+response.status+')');
    return response;
}, function (error) {
    if(error.response != null){
        toastr.error(error.response.data.message, 'Hata');
    } else{
        toastr.error(error.message, 'Hata');
    }

    return Promise.reject(error);
});

export default instance;
