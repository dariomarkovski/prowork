import axios from 'axios';

export function login(username, password) {
    return axios.request({
        method: 'POST',
        url: 'http://localhost:8080/api/access/login',
        headers: { 'content-type': 'application/json' },
        data: {
            username: username,
            password: password
        }
    });
}

export function register(username, password, email){
    return axios.request({
        method: 'POST',
        url: 'http://localhost:8080/api/access/register',
        headers: { 'content-type': 'application/json' },
        data: {
            username: username,
            password: password,
            email: email
        }
    });
}