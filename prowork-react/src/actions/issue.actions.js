import { getIssues, getUsers } from "../services/issue.service";

export const GET_ISSUES = 'GET_ISSUES'
export const GET_USERS = 'GET_USERS'

export function getIssuesAction(token) {
    return dispatch => {
        getIssues(token).then((response) => {
            dispatch({ type: GET_ISSUES, issues: response.data })
        }).catch((error) => console.error(error))
    }
}

export function getUsersAction(token) {
    return dispatch => {
        getUsers(token).then((response) => {
            dispatch({ type: GET_USERS, users: response.data })
        }).catch((error) => console.error(error));
    }
}