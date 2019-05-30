import React from 'react';
import { connect } from 'react-redux';
import { logoutAction } from '../actions/access.actions'
import image from '../assets/newIssue.png'
import { Link } from 'react-router-dom'

class LoggedHeaderComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    logout = (event) => {
        this.props.dispatch(logoutAction())
    }

    render() {
        return (
            <div className="pt-3 pb-3 mb-5 gold-background-color">
                <div className="row ml-3 mr-3 justify-content-between">
                    <div className="row m-0 d-flex justify-content-start align-items-center">
                        <h4 className="mr-5 mb-0">ProWork</h4>
                        <Link to="/new-issue" className="d-flex align-items-center link-no-decor">
                            <img src={image} alt='Create New Isue' width="20px" height="20px" />
                            <span className="ml-1">New Issue</span>
                        </Link>
                    </div>
                    <div>
                        <a>{this.props.username}</a>
                        <a onClick={this.logout} className="logout-link">Log Out</a>
                    </div>
                </div>
            </div>
        )
    }

}

function mapStateToProps(state) {
    const { loggingIn, loggedIn, token, username } = state;
    return { loggingIn: loggingIn, loggedIn: loggedIn, token: token, username: username }
}

const loggedHeaderComp = connect(mapStateToProps)(LoggedHeaderComponent);
export { loggedHeaderComp as LoggedHeaderComponent }
