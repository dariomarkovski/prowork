import { GET_ISSUES, GET_USERS } from "../actions/issue.actions";

const initState = {};
export function issueReducer(state = initState, action) {
    switch (action.type) {
        case GET_ISSUES:
            let issues = action.issues;
            return {
                ...state,
                issues
            }
        case GET_USERS:
            let users = action.users;
            return {
                ...state,
                users
            }
        default:
            return {
                ...state
            }
    }
}