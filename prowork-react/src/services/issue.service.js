import axios from 'axios';

export function getIssues(token) {
    return axios.request({
        method: 'GET',
        url: 'http://localhost:8080/api/issue/all',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export function getUsers(token) {
    return axios.request({
        method: 'GET',
        url: 'http://localhost:8080/api/user/getAll',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export function changeStatusOfIssue(issue, statusCode, token) {
    return axios.request({
        method: 'POST',
        url: 'http://localhost:8080/api/issue/changeStatus',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        data: {
            issueId: issue.issueId,
            statusCode: statusCode
        }
    })
}

export function changeAssigneeOfIssue(issue, username, token) {
    return axios.request({
        method: 'POST',
        url: 'http://localhost:8080/api/issue/changeAssignee',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        data: {
            issueId: issue.issueId,
            username: username
        }
    })
}

export function createNewIssue(issue, token) {
    return axios.request({
        method: 'POST',
        url: 'http://localhost:8080/api/issue/new',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        data: issue
    })
}