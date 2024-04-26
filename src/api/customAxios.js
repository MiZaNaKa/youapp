import axios from 'axios';
import jwtHelper from '../jwtHelper/jwtHelper';
const customAxios = axios.create({
    baseURL: `https://techtest.youapp.ai/`,
    // timeout: 10000, 
    headers: {
        "Content-Type": "application/json",
        // "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    data: {}
});

// Step-2: Create request, response & error handlers
const requestHandler =async request => {
    var jwt=await jwtHelper.jwt()
    const headers = {
        'Content-Type': 'application/json',
        'x-access-token': jwt
    }
   
    request.headers = headers;  
  
    return request;
};

const responseHandler = response => {
    
    if (response.status === 401) {
        window.location = '/login';
    }

    return response;
};

const errorHandler = error => {
    return Promise.reject(error);
};

customAxios.interceptors.request.use(
    (request) => requestHandler(request),
    (error) => errorHandler(error)
);

customAxios.interceptors.response.use(
    (response) => responseHandler(response),
    (error) => errorHandler(error)
 );


export default customAxios;