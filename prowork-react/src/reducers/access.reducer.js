import { LOGIN_SENT, LOGIN_SUCCESS, LOGOUT } from '../actions/access.actions';

const initState = {};
export function accessReducer(state = initState, action) {
    switch (action.type) {
        case LOGIN_SENT:
            return {
                ...state,
                loggingIn: true,
                loggedIn: false,
                token: null,
                username: null
            };
        case LOGIN_SUCCESS:
            let { token, username } = action.info;
            return {
                ...state,
                loggingIn: false,
                loggedIn: true,
                token: token,
                username: username
            };
        case LOGOUT: 
            return {
                ...state,
                loggingIn: false,
                loggedIn: false,
                token: null,
                username: null,
            }
        default:
            return { ...state }
    }
}