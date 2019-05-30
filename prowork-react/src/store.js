import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk'

import { accessReducer } from './reducers/access.reducer';
import { issueReducer } from './reducers/issue.reducer';

let combined = combineReducers({
    accessReducer,
    issueReducer
})

export const store = createStore(combined, applyMiddleware(thunk));