import { login } from '../services/access.service'
import { history } from '../helpers/history'

export const LOGIN_SENT = 'LOGIN_SENT'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGOUT = 'LOGOUT'

export function loginAction(username, password) {
    return dispatch => {
        dispatch({ type: LOGIN_SENT });
        login(username, password).then((response) => {
            localStorage.setItem('token', response.data);
            localStorage.setItem('username', username);
            dispatch({
                type: LOGIN_SUCCESS, info: {
                    token: response.data,
                    username: username
                }
            });
            history.push('/home');
        });
    }
}

export function loginFromStorageAction(token, username){
    return dispatch => {
        dispatch({
            type: LOGIN_SUCCESS, info: {
                token: token,
                username: username
            }
        });
        history.push('/home');
    }
}

export function logoutAction() {
    return dispatch => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        dispatch({ type: LOGOUT })
        history.push('/login');
    }
}