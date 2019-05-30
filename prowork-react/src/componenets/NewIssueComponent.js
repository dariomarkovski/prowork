import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { LoggedHeaderComponent } from './LoggedHeaderComponent';
import { getUsersAction } from '../actions/issue.actions';
import { createNewIssue } from '../services/issue.service';

class NewIssueComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dueDateSelected: false,
            type: 'TASK',
            dueDate: null
        };
    }

    componentDidMount() {
        if (this.props.users) {
            this.props.dispatch(getUsersAction(this.props.token));
        }
    }

    handleChange = (event) => {
        let key = event.target.id;
        let value = event.target.value;
        this.setState({
            [key]: value
        });
    }

    changeDueDateInputEnabled = () => {
        this.setState({
            dueDateSelected: !this.state.dueDateSelected
        });
    }

    submitNewIssue = (event) => {

        event.preventDefault();

        let state = this.state;

        if (!state || !state.name || !state.type || !state.reviewedBy || !state.assignedTo || !state.description || state.dueDateSelected == null || (state.dueDateSelected != null && !state.name)){
            console.log('Error');
        }else{
            createNewIssue(this.state, this.props.token).then((response) => {
                this.props.history.push('/home');
            });
        }

    }

    discard = (event) => {
        event.preventDefault();
        this.props.history.push('/home');
    }

    render() {
        return (
            <div>
                <LoggedHeaderComponent />
                <div className="container">
                    <form onSubmit={this.submitNewIssue}>
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Name:</label>
                            <div className="col-sm-9">
                                <input id="name" className="form-control" onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Type:</label>
                            <div className="col-sm-9">
                                <select id="type" className="form-control" onChange={this.handleChange}>
                                    <option value="TASK">Task</option>
                                    <option value="STORY">Story</option>
                                    <option value="BUG">Bug</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Reviewed By:</label>
                            <div className="col-sm-9">
                                <select id="reviewedBy" className="form-control" onChange={this.handleChange}>
                                    <option value="No one selected">No one selected</option>
                                    {
                                        this.props.users.map((user) => {
                                            return (<option key={`review-${user.username}`} value={user.username}>
                                                {user.username}
                                            </option>)
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Assigned To:</label>
                            <div className="col-sm-9">
                                <select id="assignedTo" className="form-control" onChange={this.handleChange}>
                                    <option value="No one selected">No one selected</option>
                                    {
                                        this.props.users.map((user) => {
                                            return (<option key={`assign-${user.username}`} value={user.username}>
                                                {user.username}
                                            </option>)
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Description:</label>
                            <div className="col-sm-9">
                                <textarea id="description" maxLength="1000" rows="10" className="form-control" onChange={this.handleChange}>
                                </textarea>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Due Date:</label>
                            <div className="col-sm-4">
                                <input id="dateDue" type="date" disabled={!this.state.dueDateSelected} onChange={this.handleChange} />
                            </div>
                            <div>
                                <input id="dueDateSelected" type="checkbox" onChange={() => this.changeDueDateInputEnabled()} />
                            </div>
                        </div>
                        <div>
                            <button className="btn btn-dark" type="submit">Submit Issue</button>
                            <button className="btn btn-danger ml-3" onClick={this.discard}>Discard Issue</button>
                        </div>
                    </form >
                </div >
            </div>
        )
    }

}

function mapStateToProps(state) {
    const { loggingIn, loggedIn, token, username } = state.accessReducer;
    const { issues, users } = state.issueReducer;
    return { loggingIn, loggedIn, token, username, issues, users }
}

const newIssueComp = connect(mapStateToProps)(NewIssueComponent);
export { newIssueComp as NewIssueComponent }