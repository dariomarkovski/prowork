import axios from 'axios';

export function getCommentsForIssue(issueId, token) {
    return axios.request({
        method: 'GET',
        url: `http://localhost:8080/api/comment/allByIssueId?issueId=${issueId}`,
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
}

export function addCommentForIssue(issueId, commentText, token) {
    return axios.request({
        method: 'POST',
        url: 'http://localhost:8080/api/comment/new',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        data: {
            issue: issueId,
            commentText: commentText
        }
    })
}

export function deleteComment(commentId, token){
    return axios.request({
        method: 'POST',
        url: 'http://localhost:8080/api/comment/delete',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        data: {
            commentId: commentId
        }
    })
}