import React from 'react';
import { connect } from 'react-redux';
import { loginAction } from '../actions/access.actions';
import { Link } from 'react-router-dom'
import { HeaderComponent } from './HeaderComponent';

class LoginComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    componentDidMount() {
        document.body.classList = ['gold-background-color'];
    }

    componentWillUnmount() {
        document.body.classList = [];
    }

    onSubmit = (event) => {
        event.preventDefault();
        let { username, password } = this.state;
        this.props.dispatch(loginAction(username, password));
    }

    handleChange = (event) => {
        let key = event.target.id;
        let value = event.target.value;
        this.setState({
            [key]: value
        })
    }

    render() {
        return (
            <div>
                <HeaderComponent />
                <div className="row justify-content-center">
                    <div className="col-sm-6">
                        <div>Log in to your account</div>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input type="text" className="form-control" id="username" placeholder="Username" onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" id="password" placeholder="Password" onChange={this.handleChange} />
                            </div>
                            <div className="d-flex justify-content-center">
                                <button type="submit" className="btn mr-3 btn-primary">Submit</button>
                                <Link to="/register" className="btn ml-3 btn-primary">Register</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}

function mapStateToProps(state) {
    const { loggingIn, loggedIn, token, username } = state.accessReducer;
    return { loggingIn: loggingIn, loggedIn: loggedIn, token: token, username: username }
}

const loginComp = connect(mapStateToProps)(LoginComponent);
export { loginComp as LoginComponent }