import {$authHost, $host} from './index';
import jwt_decode from 'jwt-decode';
import axiosRetry from 'axios-retry';

// axiosRetry($host, { retryCondition: () => {
//     if ()
// }});
// axiosRetry($authHost, { retries: 3 });

export const adminRegistartion = async(email, password, role) => {
    const {data} = await $authHost.post('api/user/adminregistartion', {email, password, role})
    return jwt_decode(data.token);
} 

export const registration = async(email, password, role) => {
    const {data} = await $host.post('api/user/registration', {email, password, role})
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
} 

export const login = async(email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
} 

export const check = async() => {
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
}