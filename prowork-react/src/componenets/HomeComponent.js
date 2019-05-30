import React from 'react';
import { connect } from 'react-redux';
import { LoggedHeaderComponent } from './LoggedHeaderComponent';
import { getIssuesAction, getUsersAction } from '../actions/issue.actions';
import { changeStatusOfIssue, changeAssigneeOfIssue } from '../services/issue.service';
import { getCommentsForIssue, addCommentForIssue, deleteComment } from '../services/comment.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as moment from 'moment';

class HomeComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            commentText: ''
        };
    }

    componentDidMount() {
        document.body.classList = ['blue-background-color']
        this.props.dispatch(getIssuesAction(this.props.token));
        this.props.dispatch(getUsersAction(this.props.token));
    }

    componentWillReceiveProps(nextProps) {
        this.filterIssues(nextProps.issues);
    }

    changeUserField = async (event, field) => {
        event.preventDefault();
        await this.setState({
            field: field
        })
        this.filterIssues();
    }

    changeStatus = async (status) => {
        await this.setState({
            status: status
        })
        this.filterIssues();
    }

    filterIssues(issues) {
        const username = localStorage.getItem('username');
        issues = issues ? issues : this.props.issues;
        let filteredIssues = issues;
        if (this.state.field === 'all') {
            filteredIssues = issues;
        } else if (this.state.field === 'assigned') {
            filteredIssues = issues.filter((issue) => issue.assignedTo.username === username);
        } else if (this.state.field === 'created') {
            filteredIssues = issues.filter((issue) => issue.createdBy.username === username);
        } else if (this.state.field === 'review') {
            filteredIssues = issues.filter((issue) => issue.reviewedBy.username === username);
        }
        if (this.state.status === 'none') {
            filteredIssues = filteredIssues.filter((issue) => issue.status === 'NONE');
        } else if (this.state.status === 'working') {
            filteredIssues = filteredIssues.filter((issue) => issue.status === 'WORKING');
        } else if (this.state.status === 'done') {
            filteredIssues = filteredIssues.filter((issue) => issue.status === 'DONE');
        }
        this.setState({
            filteredIssues: filteredIssues,
            selectedIssue: undefined
        })
    }

    selectIssue = async (event, issue) => {
        await this.setState({
            selectedIssue: issue,
            commentText: ''
        })
        getCommentsForIssue(issue.issueId, this.props.token).then((res) => this.setState({
            comments: res.data
        }));
    }

    changeIssueStatus(statsuCode) {
        changeStatusOfIssue(this.state.selectedIssue, statsuCode, this.props.token)
            .then((response) => this.props.dispatch(getIssuesAction(this.props.token)))
            .catch((error) => console.error(error));
    }

    changeIssueAssignee(username) {
        changeAssigneeOfIssue(this.state.selectedIssue, username, this.props.token)
            .then((response) => this.props.dispatch(getIssuesAction(this.props.token)))
            .catch((error) => console.error(error));
    }

    handleChange = async (event) => {
        let key = event.target.id;
        let value = event.target.value;
        this.setState({
            [key]: value
        })
    }

    addComment = () => {
        addCommentForIssue(this.state.selectedIssue.issueId, this.state.commentText, this.props.token)
            .then((res) => {
                getCommentsForIssue(this.state.selectedIssue.issueId, this.props.token).then((res) => this.setState({
                    comments: res.data,
                    commentText: ''
                }));
            })
    }

    deleteComment = (commentId) => {
        deleteComment(commentId, this.props.token).then((res) => {
            getCommentsForIssue(this.state.selectedIssue.issueId, this.props.token).then((res) => this.setState({
                comments: res.data
            }));
        })
    }

    discardComment = () => {
        this.setState({
            commentText: ''
        })
    }

    render() {
        return (
            <div>
                <LoggedHeaderComponent />
                <br />
                <div className="row m-0">
                    <div className="col-sm-6">
                        <div role="group" className="d-flex filter-buttons filter-buttons-upper">
                            <button className={`btn btn-secondary flex-grow-1`} onClick={(event) => this.changeUserField(event, 'all')}>All Tasks</button>
                            <button className={`btn btn-secondary flex-grow-1`} onClick={(event) => this.changeUserField(event, 'assigned')}>Assigned To Me</button>
                            <button className={`btn btn-secondary flex-grow-1`} onClick={(event) => this.changeUserField(event, 'created')}>Created By Me</button>
                            <button className={`btn btn-secondary flex-grow-1`} onClick={(event) => this.changeUserField(event, 'review')}>Reviewed By Me</button>
                        </div >
                        <div>
                            <div id="task-main">
                                <div role="group" className="d-flex filter-buttons filter-buttons-bottom">
                                    <button type="button" className={`btn btn-secondary flex-grow-1`} onClick={() => this.changeStatus('all')}>ALL</button>
                                    <button type="button" className={`btn btn-secondary flex-grow-1`} onClick={() => this.changeStatus('none')}>NONE</button>
                                    <button type="button" className={`btn btn-secondary flex-grow-1`} onClick={() => this.changeStatus('working')}>WORKING</button>
                                    <button type="button" className={`btn btn-secondary flex-grow-1`} onClick={() => this.changeStatus('done')}>DONE</button>
                                </div>
                            </div>
                        </div>
                        {
                            this.state.filteredIssues != null &&
                            <div>
                                <div>
                                    {
                                        this.state.filteredIssues.map((issue) => {
                                            return (
                                                <div key={issue.issueId} className="task-list-item p-2" onClick={() => this.selectIssue(issue)}
                                                    onClick={(event) => this.selectIssue(event, issue)}>
                                                    {issue.name}
                                                </div>
                                            )
                                        })
                                    }
                                </div>

                            </div>
                        }
                    </div>
                    {
                        this.state.selectedIssue != null &&
                        <div className="col-sm-6">
                            <div className="d-flex">
                                <div className="dropdown">
                                    <button type="button" className="btn btn-secondary dropdown-toggle status-button" data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false">
                                        Status
                                    </button>
                                    <div className="dropdown-menu">
                                        <a className="dropdown-item" onClick={(event) => this.changeIssueStatus(0)}>NONE</a>
                                        <a className="dropdown-item" onClick={(event) => this.changeIssueStatus(1)}>WORKING</a>
                                        <a className="dropdown-item" onClick={(event) => this.changeIssueStatus(2)}>DONE</a>
                                    </div>
                                </div>
                                <div className="dropdown">
                                    <button type="button" className="btn btn-secondary dropdown-toggle assign-button" data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false">
                                        Assign to other
                                    </button>
                                    <div className="dropdown-menu">
                                        {
                                            this.props.users.map((user) => {
                                                return (
                                                    <a key={`assign_${user.username}`} className="dropdown-item" onClick={(event) => this.changeIssueAssignee(user.username)}>{user.username}</a>
                                                )
                                            })
                                        }
                                    </div>
                                </div>

                            </div>
                            <div>
                                <div className="mt-2"><span className="font-italic">Name: </span>{this.state.selectedIssue.name}</div>
                                <div className="mt-2 d-flex justify-content-between">
                                    <div className="col-6 p-0"><span className="font-italic">Status: </span>{this.state.selectedIssue.status}</div>
                                    <div className="col-6 p-0"><span className="font-italic">Type: </span>{this.state.selectedIssue.type}</div>
                                </div>
                                <div className="mt-2"><span className="font-italic">Created By: </span>{this.state.selectedIssue.createdBy.username}</div>
                                <div className="mt-2"><span className="font-italic">Reviewed By: </span>{this.state.selectedIssue.reviewedBy.username}</div>
                                <div className="mt-2"><span className="font-italic">Assigned To: </span>{this.state.selectedIssue.assignedTo.username}</div>
                                <div className="mt-2"><span className="font-italic">Date Created: </span>{moment(this.state.selectedIssue.dateCreated).format('DD/MM/YYYY HH:mm')}</div>
                                <div className="mt-2"><span className="font-italic">Date Due: </span>{
                                    this.state.selectedIssue.dateDue != null &&
                                    <span>{moment(this.state.selectedIssue.dateDue).format('DD/MM/YYYY HH:mm')}</span>}{
                                        this.state.selectedIssue.dateDue == null &&
                                        <span>NONE</span>
                                    }
                                </div>
                                <div className="mt-2"><span className="font-italic">Description: </span>
                                    <div>{this.state.selectedIssue.description}</div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                {
                    this.state.selectedIssue && this.state.comments && (
                        <div className="activity-div m-5 row d-flex justify-content-end">
                            <div className="col-6">
                                <h3>Activity Section</h3>
                                <div className="comment-div">
                                    {
                                        this.state.comments.length === 0 && <div >No comments</div>
                                    }
                                    {
                                        this.state.comments.length > 0 && (
                                            <div className="comments-section">
                                                {
                                                    this.state.comments.map((comment) => {
                                                        return (
                                                            <div className="comments-section-item" key={comment.commentId}>
                                                                <div className="comment-desc">
                                                                    <div className="comment-desc-user font-italic">
                                                                        {comment.commentedBy.username} commented:
                                                                    </div>
                                                                </div>
                                                                <div className="mt-2 mb-2 d-flex justify-content-between">
                                                                    <div className="col-10 p-0">
                                                                        {comment.commentText}
                                                                    </div>
                                                                    <div className="comment-desc-delete">
                                                                        <button className="btn btn-danger" onClick={() => this.deleteComment(comment.commentId)}>
                                                                            <FontAwesomeIcon icon="trash" />
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="input-group">
                                    <input type="text" id="commentText" className="form-control" placeholder="Add New Comment" aria-label="Recipient's username"
                                        aria-describedby="basic-addon2" onChange={this.handleChange} value={this.state.commentText} />
                                    <div className="input-group-append">
                                        <button className="btn btn-outline-secondary confirm" type="button" onClick={this.addComment} >Confirm</button>
                                        <button className="btn btn-outline-secondary discard" type="button" onClick={this.discardComment}>Discard</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>

        )
    }
}

function mapStateToProps(state) {
    const { loggingIn, loggedIn, token, username } = state.accessReducer;
    const { issues, users } = state.issueReducer;
    return { loggingIn, loggedIn, token, username, issues, users }
}

const homeComp = connect(mapStateToProps)(HomeComponent);
export { homeComp as HomeComponent }